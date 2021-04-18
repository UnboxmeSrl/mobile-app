import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { equals, isEmpty, isNil, not, pipe, prop, propOr } from 'ramda'

import { USERS_COLLECTION } from '@const/firebase'
import { APPROVED_USER, IN_REVIEW_USER, REJECTED_USER } from '@const/verification'
import { createReduxModule } from '@redux/createModule'

export const AUTH_NAMESPACE = 'auth'

export const _initialized = 'initialized'
export const _uid = 'uid'
export const _fullName = 'fullName'
export const _gender = 'gender'
export const _username = 'username'
export const _city = 'city'
export const _dobTs = 'dobTs'
export const _hasAgency = 'hasAgency'
export const _agencyName = 'agencyName'
export const _tiktokUsername = 'tiktokUsername'
export const _instagramUsername = 'username'
export const _instagram = 'instagram'
export const _verificationStatus = 'verificationStatus'
export const _experienceType = 'experienceType'
export const _wizardCode = 'wizardCode'
export const _questionnaire = 'questionnaire'
export const _skinType = 'skinType'
export const _skincareRoutine = 'skincareRoutine'
export const _creams = 'creams'
export const _brands = 'brands'

const initialState = {
  [_initialized]: false,
}

const ref = firestore().collection(USERS_COLLECTION)

export const updateQuestionnaire = (field, value) => updateMe({ [`${_questionnaire}.${field}`]: value })
export const updateMe = createAsyncThunk(`${AUTH_NAMESPACE}/updateMe`, async (payload) => {
  const user = auth().currentUser
  const uid = user?.uid
  const doc = await ref.doc(uid).get()

  if (doc.exists) {
    return await ref.doc(uid).update({ ...payload, uid })
  } else {
    return await ref.doc(uid).set({ uid, ...payload })
  }
})

const {
  slice,
  selectors: { selectState },
} = createReduxModule({ initialState, name: AUTH_NAMESPACE })

export const selectUid = createSelector(selectState, prop(_uid))
export const selectIsAuthenticated = createSelector(selectUid, Boolean)
export const selectFullName = createSelector(selectState, prop(_fullName))
export const selectGender = createSelector(selectState, prop(_gender))
export const selectUsername = createSelector(selectState, prop(_username))
export const selectDobTs = createSelector(selectState, propOr(+new Date(), _dobTs))
export const selectCity = createSelector(selectState, prop(_city))
export const selectHasAgency = createSelector(selectState, prop(_hasAgency))
export const selectAgencyName = createSelector(selectState, prop(_agencyName))
export const selectIsAuthInitialized = createSelector(selectState, prop(_initialized))
export const selectTiktokUsername = createSelector(selectState, prop(_tiktokUsername))
export const selectInstagramData = createSelector(selectState, prop(_instagram))
export const selectExperienceType = createSelector(selectState, prop(_experienceType))
export const selectWizardCode = createSelector(selectState, prop(_wizardCode))
export const selectVerificationStatus = createSelector(selectState, prop(_verificationStatus))
export const selectIsVerified = createSelector(selectVerificationStatus, equals(APPROVED_USER))
export const selectIsRejected = createSelector(selectVerificationStatus, equals(REJECTED_USER))
export const selectIsInReview = createSelector(selectVerificationStatus, equals(IN_REVIEW_USER))
export const selectInstagramUsername = createSelector(selectInstagramData, prop(_instagramUsername))
export const selectQuestionnaire = createSelector(selectState, prop(_questionnaire))
export const selectSkinType = createSelector(selectQuestionnaire, prop(_skinType))
export const selectSkincareRoutine = createSelector(selectQuestionnaire, prop(_skincareRoutine))
export const selectCreams = createSelector(selectQuestionnaire, prop(_creams))
export const selectBrands = createSelector(selectQuestionnaire, prop(_brands))
// TODO: replace
export const selectHasQuestionnaire = createSelector(selectBrands, pipe(isNil, not))

export default slice
