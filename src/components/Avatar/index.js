import React from 'react'

import { AvatarPresenter } from './AvatarPresenter'

export const Avatar = ({ onPress, style }) => {
  const placeholder = { uri: 'https://www.nacdnet.org/wp-content/uploads/2016/06/person-placeholder.jpg' }
  const props = { onPress, placeholder, style }
  return <AvatarPresenter {...props} />
}
