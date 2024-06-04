import React from 'react';
import {StyleSheet, View} from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken(
  'pk.eyJ1IjoiY2xhcmlzYXBwIiwiYSI6ImNsd3oyNDlpczAybWcycXIyNXp6bXVzbXMifQ.i3dwAgtGLJUvy9Ajw8CFgg',
);

function MapScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map} />
      </View>
    </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1,
  },
});
