import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView from 'react-native-maps'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { Map } from '@components/Map'
import { PasswordInput } from '@components/PasswordInput'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText } from '@components/Text'
import { IS_IOS, screenHeight, screenWidth } from '@const/common'
import { EMAIL_RULES_LOGIN, PASSWORD_RULES, REQUIRED_RULE } from '@const/validators'
import { logger } from '@services'

export const AddNewAddressPresenter = ({
  products = [],
  address,
  setAddress,
  onPress,
  region,
  appLocation,
  markerCoordinate,
  control,
  errors,
}) => (
  <RouteContainer tKey={'addresses.addNewTitle'} withArrow>
    <Wrapper behavior={IS_IOS ? 'padding' : 'height'} keyboardVerticalOffset={20}>
      <MapWrapper>
        <Map markerCoordinate={markerCoordinate} region={region} title={address.formatted_address} />
      </MapWrapper>
      <StyledForm>
        <StyledInput
          autoCapitalize="none"
          control={control}
          errors={errors}
          labelKey={'labels.address'}
          name="address"
          placeholderKey="placeholders.address"
          rules={REQUIRED_RULE}
        />
        <StyledInput
          autoCapitalize="none"
          control={control}
          errors={errors}
          labelKey={'labels.comments'}
          name="comments"
          placeholderKey="placeholders.comments"
        />
        <StyledButton onPress={onPress} tKey={'Confirm'} />
      </StyledForm>
      <InputWrapper>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          numberOfLines={2}
          onFail={(error) => logger.error(error)}
          onPress={(data, details = null) => {
            console.log('press')
            setAddress(details)
          }}
          placeholder="Search for your address"
          query={{
            // language of the results
            components: 'country:pl',
            key: 'AIzaSyCP1Xek2gd3Rb-JKG0wQjhtqBkXx3eYGfk',
            language: 'pl',
            predefinedPlaces: [{ location: appLocation }],
            types: 'address',
          }}
        />
      </InputWrapper>
    </Wrapper>
  </RouteContainer>
)

const Wrapper = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: flex-end;
`

const StyledInput = styled(Input)`
  margin-bottom: 22px;
`
const InputWrapper = styled.View`
  margin-bottom: 10px;
  padding: 0 20px;
  position: absolute;
  top: 20px;
  width: 100%;
`
const MapWrapper = styled.View`
  height: ${(screenHeight * 2) / 3}px;
  position: absolute;
  top: 0;
  width: ${screenWidth}px;
`
const StyledButton = styled(Button)`
  margin-top: 24px;
`

const StyledForm = styled(Form)`
  background-color: white;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding: 20px 20px 0;
`
