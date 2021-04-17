import firestore from '@react-native-firebase/firestore'
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { normalize } from 'normalizr'
import { head, mapObjIndexed, pick, pipe, prop, values } from 'ramda'

import { BOXES_COLLECTION } from '@const/firebase'

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

export const createFirebaseReduxModule = ({ collection, schema }) => {
  const ref = firestore().collection(collection)
  const collectionAdapter = createEntityAdapter()
  const initialState = collectionAdapter.getInitialState()

  const fetchAll = createAsyncThunk(`${collection}/fetch`, async (payload) => {
    const snapshot = await ref.get()
    const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const normalized = normalize(data, [schema])

    return normalized.entities
  })
  const fetchById = createAsyncThunk(`${collection}/fetchById`, async (id) => {
    const snapshot = await ref.doc(id).get()
    const data = { ...snapshot.data(), id: snapshot.id }
    const normalized = normalize(data, schema)

    return normalized.entities
  })
  const adapterSelectors = collectionAdapter.getSelectors(prop(collection))
  const selectByIds = (ids) => createSelector(adapterSelectors.selectEntities, pipe(pick(ids), values))
  const selectById = (id) => createSelector(adapterSelectors.selectEntities, pipe(pick([id]), values, head))

  return {
    actions: {
      fetchAll,
      fetchById,
    },
    selectors: {
      ...adapterSelectors,
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
