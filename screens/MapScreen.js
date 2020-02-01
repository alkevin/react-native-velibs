import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import { VelibContext } from '../App';

export default function MapScreen() {

  const [location, setLocation] = useState({
    latitude: 48.848537,
    longitude: 2.388381,
  });

  const context = useContext(VelibContext);

  return (
    <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       initialRegion={{
          latitude: context.position.coords.latitude,
          longitude: context.position.coords.longitude,
          latitudeDelta: 0.0150,
          longitudeDelta: 0.0150,
       }}
       showsUserLocation={true}
     >
     {context.velibs.records.map(station => (
      <Marker
        coordinate={{
          latitude: station.geometry.coordinates[1],
          longitude: station.geometry.coordinates[0],
        }}
        title = {station.fields.station_name}
        description={"velibs disponibles: " + station.fields.nbbike}
        key={station.recordid.toString()}
      />
     ))}
     </MapView>
   </View>
  );
}

MapScreen.navigationOptions = {
  title: 'Map',
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
