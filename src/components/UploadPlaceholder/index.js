import React, { useEffect, useState } from 'react'
import { Animated, Easing } from 'react-native'
import { createThumbnail } from 'react-native-create-thumbnail'
import { launchImageLibrary } from 'react-native-image-picker'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import storage, { firebase } from '@react-native-firebase/storage'
import { last } from 'ramda'
import * as lasturi from 'ramda'

import { WIDTH_ANIMATION_DURATION } from '@components/ProgressBar'
import { screenWidth } from '@const/common'
import { selectBoxById } from '@redux/modules/boxes'
import { selectOrderByBoxId } from '@redux/modules/orders'
import { showToastError } from '@services'

import { UploadPlaceholderPresenter } from './UploadPlaceholderPresenter'

const reference = firebase.app().storage('gs://unboxme-firebase-content')

const SIZE = (screenWidth - 80) / 2

export const UploadPlaceholder = () => {
  const [task, setTask] = useState(null)
  const [file, setFile] = useState(null)
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

  const onPress = () => {
    launchImageLibrary({ mediaType: 'video' }, async ({ uri, fileName }) => {
      if (uri) {
        setFile(uri)
        const name = fileName || last(uri.split('/'))
        const ref = reference.ref(`${box.name.en}/${order.id}/${name}`)
        setTask(ref.putFile(uri))
      } else {
        // showToastError('Something went wrong')
      }
    })
  }
  const onRemove = () => {}

  useEffect(() => {
    if (task) {
      task.on('state_changed', (taskSnapshot) => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`)
        setProgress(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes)
      })

      task.then(() => {
        console.log('Image uploaded to the bucket!')
      })
    }
  }, [task])
  const props = { height, isComplete: progress === 1, onPress, progress, thumb: file }
  console.log(progress)

  return <UploadPlaceholderPresenter {...props} />
}
