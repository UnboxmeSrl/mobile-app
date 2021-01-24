import * as React from 'react'

export const navigationRef = React.createRef()

export function rootNavigate(name, params) {
  navigationRef.current?.navigate(name, params)
}

export function rootReset(name, params) {
  navigationRef.current?.reset({ index: 0, routes: [{ name: name, params }] })
}
