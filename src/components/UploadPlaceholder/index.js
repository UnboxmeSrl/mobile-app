import React, { useEffect, useState } from 'react'
import { Animated, Easing, Platform } from 'react-native'
import { createThumbnail } from 'react-native-create-thumbnail'
import RNFS from 'react-native-fs'
import { launchImageLibrary } from 'react-native-image-picker'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { last } from 'ramda'
import * as lasturi from 'ramda'
import RNFetchBlob from 'rn-fetch-blob'
import { WIDTH_ANIMATION_DURATION } from '@components/ProgressBar'
import { screenWidth } from '@const/common'
import { selectBoxById } from '@redux/modules/boxes'
import { selectOrderByBoxId } from '@redux/modules/orders'
import { logger, showToastError } from '@services'
import { hasReadAndroidPermission } from '@services/permissions'

import { UploadPlaceholderPresenter } from './UploadPlaceholderPresenter'
// ...
export async function getPathForFirebaseStorage(uri) {
  // The reason we have this function is that on android if the file comes from google photos we can't access it directly
  if (Platform.OS === 'ios') {
    return uri
  }

  if (!uri.includes('content://com.google')) {
    return uri
  }

  const stat = await RNFetchBlob.fs.stat(uri)
  return stat.path
}
const SIZE = (screenWidth - 80) / 2

export const UploadPlaceholder = ({ fromStorage, item }) => {
  const [task, setTask] = useState(null)
  const [file, setFile] = useState(null)
  const [removed, setRemoved] = useState(false)
  const [publicUrl, setPublicUrl] = useState(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const boxId = useNavigationParam('boxId')
  const box = useSelector(selectBoxById(boxId))
  const order = useSelector(selectOrderByBoxId(boxId))
  const [progress, setProgress] = useState(0)

  const [animatedValue] = useState(new Animated.Value(progress))

  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: WIDTH_ANIMATION_DURATION,
      easing: Easing.linear(),
      toValue: progress,
      useNativeDriver: false,
    }).start()
  }, [animatedValue, progress])

  const height = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZE, '0'],
  })

  const onPress = async () => {
    await hasReadAndroidPermission()
    launchImageLibrary({ mediaType: 'video' }, async ({ uri, fileName, ...rest }) => {
      if (uri) {
        const name = fileName || last(uri.split('/'))
      } else {
        // showToastError('Something went wrong')
      }
    })
  }
  const onRemove = async () => {
    if (fromStorage) {
      setRemoved(true)
    } else if (isCompleted) {
    } else {
      task?.abort()
    }
    setTask(null)
    setFile(null)
    setIsCompleted(null)
    setProgress(0)
  }

  useEffect(() => {
    if (task) {
      task.on('state_changed', (taskSnapshot) => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`)
        setProgress(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes)
      })

      task
        .then(() => {
          // logger.info('Image uploaded to the bucket!')
          setIsCompleted(true)
        })
        .catch((e) => {
          // logger.error(e)
        })
    }
  }, [task])

  const getDownloadUrl = async () => {
    setPublicUrl(await item.getDownloadURL())
  }
  useEffect(() => {
    if (fromStorage) {
      console.log({ fromStorage })
      getDownloadUrl()
    }
  }, [fromStorage])
  if (removed) {
    return null
  }
  const props = { file, fromStorage, height, isCompleted, item, onPress, onRemove, progress, publicUrl }

  return <UploadPlaceholderPresenter {...props} />
}
