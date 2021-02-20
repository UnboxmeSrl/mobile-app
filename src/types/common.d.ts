import { ReactElement, ReactNode } from 'react'

export type IReactChildren = ({
  children,
}: {
  children: ReactNode
}) => ReactElement

interface IObjectString {
  [k: string]: string
}
