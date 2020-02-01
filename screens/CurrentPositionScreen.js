import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-navigation';

export default function CurrentPositionScreen() {

const [currentLocation, setCurrentLocation] = useState(null);
const [location, setLocation] = useState(null);

useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({
          latitude,
          longitude
        });
        setLocation({
          latitude,
          longitude
        });
        console.log(position);
    },
    error => {
        console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
}, []);

return (
    
    <View style={styles.main_container}>
      <SafeAreaView style={styles.container}>
        {currentLocation && (
          <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={currentLocation && {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}
        >
        <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="this is your position"
            description={currentLocation.latitude + ";" + currentLocation.longitude}
          />
        </MapView>
        )}
      </SafeAreaView>
      <View style={styles.container}>
        {location && (
          <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
          }}
          onRegionChange={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        onRegionChangeComplete={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }} 
        > 
        <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="this is your position"
            description={location.latitude + ";" + location.longitude}
          />
        </MapView>
        )}
      </View>
    </View>
  );
}

CurrentPositionScreen.navigationOptions = {
  title: 'Position',
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
  },
});
