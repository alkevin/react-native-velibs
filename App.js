import React, { createContext, useEffect, useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import { getPosition } from './util/util';

export const VelibContext = createContext(1);

const VelibProvider = ({ children }) => {
  const [velibs, setVelibs] = useState([]);
  const [position, setPosition] = useState([]);
  const [bookmarks, setBookmark] = useState([]);
  const DISTANCE = 100000;
  const addBookmark = (bookmark) => {
    setBookmark([...bookmarks, bookmark]);
  };

  console.log('bookmarks provider: ' + JSON.stringify(bookmarks));

  /*useEffect( () => {
    getVelibs();
}, []);

  const getVelibs = () => { 
        fetch(API_URL)
        .then(response => response.json())
        .then(data => setVelibs(data));
    }*/

    useEffect(() => {
      const update = async () => {
          const position = await getPosition();
          const url = `https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&geofilter.distance=${position.coords.latitude},${position.coords.longitude},${DISTANCE}&rows=50&lang=fr`;
          fetch(url)
              .then(response => response.json())
              .then(data => setVelibs(data));
          setPosition(position)
      }
      update();
  },[]);

  return (
    <VelibContext.Provider value={{ velibs, position, bookmarks, addBookmark }}>
      {children}
    </VelibContext.Provider>
  );
};

export default function App() {

  return (
    <VelibProvider>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    </VelibProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
