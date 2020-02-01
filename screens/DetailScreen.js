import React, { useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions
} from 'react-native';
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import Moment from 'moment';
import { VelibContext } from '../App';

const DetailScreen = ({navigation}) => {
  
    const context = useContext(VelibContext);

    const station = navigation.state.params.station;

    const date = new Date();
    Moment.locale('fr');

    const goToMap = () => {
      navigation.navigate('Map');
    }

    const addBookmark = (station) => {
        context.addBookmark(station);
    }

  return (
    <View style={styles.main_container}>
        <View>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
                latitude: station.geometry.coordinates[1],
                longitude: station.geometry.coordinates[0],
                latitudeDelta: 0.00165,
                longitudeDelta: 0.00180,
            }}
          >
            <Marker
              coordinate={{
                latitude: station.geometry.coordinates[1],
                longitude: station.geometry.coordinates[0],
              }}
              title = {station.fields.station_name}
              description={"velibs disponibles: " + station.fields.nbbike}
              key={station.recordid.toString()}
            />
          </MapView>
        </View>
        <View>
              <Text style={styles.text_infos}>à {Math.round(station.fields.dist)}m de toi </Text>
              <Text style={styles.text_infos}>{station.fields.nbbike} vélos disponibles </Text>
              <Text style={styles.text_infos}>dont {station.fields.nbebike} vélos éléctriques disponibles</Text>
              <Text style={styles.text_infos}>Achat de ticket {station.fields.station_type === 'yes' ? 'disponible' : 'indisponible'}</Text>
              <Text style={styles.text_infos}>Mise à jour le {Moment(date).format('DD/MM/YYYY HH:mm:ss')}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.button_style}>
            <Button title="Ouvrir la carte" onPress={() => goToMap()}/>
          </View>
          <View style={styles.button_style}>
            <Button title="Ajouter aux favoris" onPress={() => addBookmark(station)}/>
          </View>
        </View>
        
    </View>
  );
}

DetailScreen.navigationOptions = ({navigation}) => {
  return {
    title: navigation.state.params.station.fields.station_name,
  };
};


const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/3,
  },
  title_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    fontSize: 26,
    paddingBottom: 5
  },
  row_container: {
    flex: 1,
  },
  text_infos: {
    fontSize: 16,
    color: 'black',
    marginLeft: 40,
    marginBottom: 10,
    paddingBottom: 10
  },
  button_style: {
    borderRadius: 15,
    backgroundColor: 'grey',
    borderColor: 'white',
    textDecorationColor: 'white',
    marginBottom: 10,
    paddingBottom: 5
},
});

export default DetailScreen