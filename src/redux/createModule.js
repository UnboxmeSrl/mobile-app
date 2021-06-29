import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { createAction, createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { normalize } from 'normalizr'
import { defaultTo, head, isEmpty, isNil, pick, pickBy, pipe, prop, values } from 'ramda'

import { USERS_COLLECTION } from '@const/firebase'
import { logger } from '@services/logger'

export const createReduxModule = ({ name, initialState = {} }) => {
  return {
    selectors: {
      selectState: prop(name),
    },
    slice: createSlice({
      initialState,
      name,
      reducers: {
        reset: (state, { payload }) => ({ ...initialState, ...payload }),
        setData: (state, { payload }) => ({ ...state, ...payload }),
      },
    }),
  }
}

export const createFirebaseReduxModule = ({ collection, schema, limitToOwner }) => {
  const ref = firestore().collection(collection)
  const collectionAdapter = createEntityAdapter()
  const initialState = collectionAdapter.getInitialState()
  const getDocumentReference = (id) => ref.doc(id)
  const whereQuery = (uid) =>
    limitToOwner ? ref.where('user', '==', firestore().collection(USERS_COLLECTION).doc(uid)) : ref

  const fetchAll = createAsyncThunk(`${collection}/fetch`, async (payload, { rejectWithValue }) => {
    try {
      const snapshot = await whereQuery(auth().currentUser?.uid).get()
      const data = snapshot?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const normalized = normalize(data, [schema])
      return normalized.entities
    } catch (error) {
      logger.error(`fetchAll - ${collection}`, { error })
      throw error
    }
  })
  const fetchById = createAsyncThunk(`${collection}/fetchById`, async (id, { rejectWithValue }) => {
    try {
      const snapshot = await whereQuery(auth().currentUser?.uid).doc(id).get()
      const data = { ...snapshot.data(), id: snapshot.id }
      const normalized = normalize(data, schema)

      return normalized.entities
    } catch (error) {
      logger.error(`fetchById - ${collection}`, { error })

      throw error
    }
  })

  const createOne = createAsyncThunk(`${collection}/createOne`, async (payload, { rejectWithValue }) => {
    try {
      const id = ref.doc().id
      const doc = ref.doc(id)
      await doc.set({ id, ...payload, createdAt: firestore.FieldValue.serverTimestamp() })
      const data = await doc.get()
      const normalized = normalize(data.data(), schema)
      return normalized.entities
    } catch (error) {
      logger.error(`createOne - ${collection}`, { error })
      throw error
    }
  })

  const updateOne = createAsyncThunk(`${collection}/updateOne`, async ({ id, ...payload }, { rejectWithValue }) => {
    try {
      const doc = ref.doc(id)
      await doc.update({ ...payload, updatedAt: firestore.FieldValue.serverTimestamp() })
      const data = await doc.get()
      const normalized = normalize(data.data(), schema)
      return normalized.entities
    } catch (error) {
      logger.error(`updateOne - ${collection}`, { error })
      throw error
    }
  })

  const removeById = createAsyncThunk(`${collection}/removeOne`, async ({ id }, { rejectWithValue }) => {
    try {
      const doc = ref.doc(id)
      await doc.delete()
      console.log(id)
      return id
    } catch (error) {
      logger.error(`removeOne - ${collection}`, { error })

      throw error
    }
  })

  const setDataFirestore = createAction(`${collection}/setData/firestore`, (data) => {
    const normalized = normalize(data, [schema])
    return { payload: normalized.entities }
  })

  const adapterSelectors = collectionAdapter.getSelectors(prop(collection))
  const selectByIds = (ids) => createSelector(adapterSelectors.selectEntities, pipe(pick(ids), values))
  const selectById = (id) => createSelector(adapterSelectors.selectEntities, pipe(pick([id]), values, head))
  const selectAllByFieldId = ({ field, value, any }) =>
    createSelector(
      adapterSelectors.selectEntities,
      pipe(
        pickBy((val) => (any ? true : val[field] === value)),
        values,
        defaultTo([])
      )
    )
  const selectByFieldId = ({ field, value, any }) =>
    createSelector(
      adapterSelectors.selectEntities,
      pipe(
        pickBy((val) => (any ? true : val[field] === value)),
        values,
        head
      )
    )

  const reducerBuilder = (builder, action) => {
    builder.addCase(action.fulfilled, (state, action) => {
      if (!isEmpty(action.payload)) {
        collectionAdapter.upsertMany(state, action.payload[collection])
      }
    })
  }

  return {
    actions: {
      createOne,
      fetchAll,
      fetchById,
      removeById,
      setDataFirestore,
      updateOne,
    },
    getDocumentReference,
    selectors: {
      ...adapterSelectors,
      selectAllByFieldId,
      selectByFieldId,
      selectById,
      selectByIds,
      selectState: prop(collection),
    },
    slice: createSlice({
      extraReducers: (builder) => {
        reducerBuilder(builder, fetchAll)
        reducerBuilder(builder, fetchById)
        reducerBuilder(builder, createOne)
        reducerBuilder(builder, updateOne)
        builder.addCase(setDataFirestore, (state, action) => {
          if (!isEmpty(action.payload[collection]) && !isNil(action.payload[collection])) {
            collectionAdapter.upsertMany(state, action.payload[collection])
          }
        })
        builder.addCase(removeById.fulfilled, (state, action) => {
          if (!isEmpty(action.payload)) {
            collectionAdapter.removeOne(state, action.payload)
          }
        })
        builder.addCase('persist/PURGE', (state, action) => initialState)
      },
      initialState,
      name: collection,
      reducers: {
        reset: (state, { payload }) => ({ ...initialState, ...payload }),
        setData: (state, { payload }) => ({ ...state, ...payload }),
      },
    }),
  }
}
