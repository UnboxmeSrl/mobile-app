import React, { useCallback, useMemo, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { IconButton } from '@components/IconButton'
import { Input } from '@components/Input'
import { COLORS } from '@const'

export const PasswordInput = ({ ...inputProps }) => {
  const [isTextHidden, setIsTextHidden] = useState(true)

  const toggleIsTextHidden = useCallback(() => setIsTextHidden(!isTextHidden), [
    isTextHidden,
  ])

  const Eye = () => <Ionicons color={COLORS.black} name={'eye-outline'} size={24} />
  const EyeClosed = () => (
    <Ionicons color={COLORS.black} name={'eye-off-outline'} size={24} />
  )

  const RightIcon = useMemo(
    () => (
      <IconButton Icon={isTextHidden ? Eye : EyeClosed} onPress={toggleIsTextHidden} />
    ),
    [isTextHidden, toggleIsTextHidden]
  )

  const props = {
    ...inputProps,
    RightIcon,
    autoCompleteType: 'password',
    secureTextEntry: isTextHidden,
  }

  return <Input {...props} />
}
