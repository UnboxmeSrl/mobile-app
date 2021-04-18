import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { ProductTile } from '@components/ProductTile'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText } from '@components/Text'
import { logger } from '@services'

export const AddNewAddressPresenter = ({ products = [], address, setAddress, onConfirm }) => (
  <RouteContainer tKey={'addresses.addNewTitle'} withArrow withPadding>
    <InputWrapper>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        numberOfLines={2}
        onFail={(error) => logger.error(error)}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details.formatted_address)
          setAddress(details.formatted_address)
        }}
        placeholder="Search"
        query={{
          key: 'AIzaSyCP1Xek2gd3Rb-JKG0wQjhtqBkXx3eYGfk',
          language: 'en', // language of the results
          types: 'address',
        }}
      />
    </InputWrapper>
    <Row>
      <BodyText>{address}</BodyText>
    </Row>
    <StyledButton disabled={!address} onPress={onConfirm} tKey={'Confirm'} />
  </RouteContainer>
)

const InputWrapper = styled.View`
  height: 300px;
  margin-bottom: 10px;
`
const Row = styled.View``
const Text = styled(BodyText)`
  margin: 20px 0px;
`
const StyledButton = styled(Button)`
  bottom: 0;
  left: 20px;
  position: absolute;
`
