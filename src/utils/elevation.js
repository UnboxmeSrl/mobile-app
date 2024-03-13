/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Platform } from 'react-native'

export function elevation(elv) {
  const iosShadowElevation = {
    shadowOpacity: 0.0015 * elv + 0.18,
    shadowRadius: 0.5 * elv,
    shadowOffset: {
      height: 0.6 * elv,
    },
  }

  const androidShadowElevation = {
    elevation: elv,
  }

  return Platform.OS === 'ios' ? iosShadowElevation : androidShadowElevation
}
