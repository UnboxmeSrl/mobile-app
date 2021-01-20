import React from 'react'
import { AccessToken } from 'react-native-fbsdk'
import { FacebookLoginPresenter } from './FacebookLoginPresenter'

export const FacebookLogin: any = () => {
  const onLoginFinished = (error: any, result: any): any => {
    if (error) {
      console.log('login has error: ' + result.error)
    } else if (result.isCancelled) {
      console.log('login is cancelled.')
    } else {
      AccessToken.getCurrentAccessToken().then((data) => {
        console.log(data.accessToken.toString())
      })
    }
  }
  return <FacebookLoginPresenter onLoginFinished={onLoginFinished} />
}
