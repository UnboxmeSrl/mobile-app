import React from 'react'
import styled from 'styled-components/native'

export const ModalContainer = ({ children }) => (
  <StyledComponent>
    {children}
  </StyledComponent>
)

const StyledComponent = styled.View`
  flex: 1;
`
