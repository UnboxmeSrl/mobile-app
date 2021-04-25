import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import styled from 'styled-components/native'

const INITIAL_REGION = {
  latitude: 45.464664,
  latitudeDelta: 0.1,
  longitude: 9.18854,
  longitudeDelta: 0.05,
}

export const Map = ({ initialRegion = INITIAL_REGION, region, markerCoordinate, title }) => {
  const markerRef = useRef()
  const mapRef = useRef()

  useEffect(() => {
    if (markerRef && markerCoordinate) {
      // markerRef?.current?.showCallout()
    }
  }, [markerRef, markerCoordinate])
  console.log(markerCoordinate)
  return (
    <Container>
      <MapStyled initalRegion={initialRegion} ref={mapRef} region={region}>
        {markerCoordinate && <Marker coordinate={markerCoordinate} ref={markerRef} title={title} />}
      </MapStyled>
    </Container>
  )
}
export const Container = styled.View`
  align-items: center;
  bottom: 0;
  justify-content: flex-end;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
`
const MapStyled = styled(MapView)`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`
