import React, { useCallback, useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { last } from 'ramda'
import { MODAL_NAMES, SCREEN_NAMES } from '@const/navigation'
import { useAction, useAuthenticatedAction } from '@hooks/common'
import {
  _image,
  selectBrands,
  selectCity,
  selectCreams,
  selectDobTs,
  selectFullName,
  selectGender,
  selectHasQuestionnaire,
  selectImage,
  selectInstagramUsername,
  selectIsAuthenticated,
  selectSkincareRoutine,
  selectSkinType,
  selectTiktokUsername,
  selectUid,
  selectUsername,
  updateMe,
} from '@redux/modules/auth'
import { hasReadAndroidPermission } from '@services/permissions'

import { EditProfileScreenPresenter } from './EditProfileScreenPresenter'

export const EditProfileScreen = () => {
  const [url, setUrl] = useState(null)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const { navigate } = useNavigation()
  const updateMeAction = useAction(updateMe)
  const navigateToWizard = () => navigate(SCREEN_NAMES.Wizard)
  const userId = useSelector(selectUid)

  const hasQuestionnaire = useSelector(selectHasQuestionnaire)
  const skinType = useSelector(selectSkinType)
  const skincareRoutine = useSelector(selectSkincareRoutine)
  const creams = useSelector(selectCreams)
  const brands = useSelector(selectBrands)

  const navigateToOnboarding = useAuthenticatedAction(navigateToWizard)
  const fullName = useSelector(selectFullName)
  const username = useSelector(selectUsername)
  const city = useSelector(selectCity)
  const image = useSelector(selectImage)
  const gender = useSelector(selectGender)
  const dob = useSelector(selectDobTs)

  const tiktokUsername = useSelector(selectTiktokUsername)
  const instagramUsername = useSelector(selectInstagramUsername)
  const navigateToNameEdit = () => navigate({ params: { step: 1 }, routeName: SCREEN_NAMES.Wizard })
  const navigateToGender = () => navigate({ params: { step: 2 }, routeName: SCREEN_NAMES.Wizard })
  const navigateToDob = () => navigate({ params: { step: 3 }, routeName: SCREEN_NAMES.Wizard })
  const navigateToCity = () => navigate({ params: { step: 4 }, routeName: SCREEN_NAMES.Wizard })

  const onImagePress = async () => {
    await hasReadAndroidPermission()
    launchImageLibrary({ mediaType: 'photo' }, async ({ uri, fileName, ...rest }) => {
      if (uri) {
        setUrl(uri)
        const name = fileName || last(uri.split('/'))
        // const uriFinal = await getPathForFirebaseStorage(uri)
        // const ref = contentRef.ref(getUserPublicPath(userId, name))
        // await ref.putFile(uriFinal)
        // const url = await ref.getDownloadURL()
        // updateMeAction({ [_image]: url })
      }
    })
  }

  const navigateTikTokModal = () => {
    navigate(MODAL_NAMES.Tiktok)
  }

  const source = image || url ? { uri: url || image } : null
  const props = {
    brands,
    city,
    creams,
    disabledSocial: !(tiktokUsername || instagramUsername),
    dob,
    fullName,
    gender,
    hasQuestionnaire,
    image,
    isAuthenticated,
    navigateTikTokModal,
    navigateToCity,
    navigateToDob,
    navigateToGender,
    navigateToNameEdit,
    navigateToOnboarding,
    navigateToWizard,
    onImagePress,
    skinType,
    skincareRoutine,
    source,
    tiktokUsername,
    url,
    username,
  }
  return <EditProfileScreenPresenter {...props} />
}
