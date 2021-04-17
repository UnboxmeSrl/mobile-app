import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { normalize } from 'normalizr'
import { head, isEmpty, mapObjIndexed, pick, pickBy, pipe, prop, values } from 'ramda'

import { BOXES_COLLECTION, USERS_COLLECTION } from '@const/firebase'

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
  const refQuery = limitToOwner
    ? ref.where('user', '==', firestore().collection(USERS_COLLECTION).doc(auth().currentUser.uid))
    : ref
  const getDocumentReference = (id) => ref.doc(id)

  const fetchAll = createAsyncThunk(`${collection}/fetch`, async (payload) => {
    const snapshot = await refQuery.get()
    const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const normalized = normalize(data, [schema])
    return normalized.entities
  })
  const fetchById = createAsyncThunk(`${collection}/fetchById`, async (id) => {
    const snapshot = await refQuery.doc(id).get()
    const data = { ...snapshot.data(), id: snapshot.id }
    const normalized = normalize(data, schema)

    return normalized.entities
  })

  const createOne = createAsyncThunk(`${collection}/createOne`, async (payload) => {
    const id = ref.doc().id
    const doc = ref.doc(id)
    await doc.set({ id, ...payload })
    const data = await doc.get()
    const normalized = normalize(data.data(), schema)

    return normalized.entities
  })

  const adapterSelectors = collectionAdapter.getSelectors(prop(collection))
  const selectByIds = (ids) => createSelector(adapterSelectors.selectEntities, pipe(pick(ids), values))
  const selectById = (id) => createSelector(adapterSelectors.selectEntities, pipe(pick([id]), values, head))
  const selectByFieldId = ({ field, value }) =>
    createSelector(
      adapterSelectors.selectEntities,
      pipe(
        pickBy((val) => val[field] === value),
        values,
        head
      )
    )

  return {
    actions: {
      createOne,
      fetchAll,
      fetchById,
    },
    getDocumentReference,
    selectors: {
      ...adapterSelectors,
      selectByFieldId,
      selectById,
      selectByIds,
      selectState: prop(collection),
    },
    slice: createSlice({
      extraReducers: (builder) => {
        builder.addCase(fetchAll.fulfilled, (state, action) => {
          collectionAdapter.upsertMany(state, action.payload[collection])
        })
        builder.addCase(fetchById.fulfilled, (state, action) => {
          collectionAdapter.upsertMany(state, action.payload[collection])
        })
        builder.addCase(createOne.fulfilled, (state, action) => {
          collectionAdapter.upsertMany(state, action.payload[collection])
        })
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
