import React from 'react'

import { AvatarPresenter } from './AvatarPresenter'

export const Avatar = ({ onPress, style, source }) => {
  const placeholder = { uri: 'https://www.nacdnet.org/wp-content/uploads/2016/06/person-placeholder.jpg' }
  const props = { onPress, placeholder, source, style }
  return <AvatarPresenter {...props} />
}
