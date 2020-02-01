import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { VelibContext } from '../App';
import { SafeAreaView } from 'react-navigation';

export default function ListScreen({ navigation }) {

  const context = useContext(VelibContext);

  const onItemSelected = station => {
    navigation.navigate('Detail', {station: station})
  }

  return (
    <FlatList
      style={styles.container}
      renderItem={({ item }) => {
        return (
          <SafeAreaView style={styles.container}>
            <TouchableOpacity>
              <View style={styles.item}>
                <Text onPress={() => onItemSelected(item)} style={styles.title}>{item.fields.station_name}</Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        )
      }}
      data={context.velibs.records}
      keyExtractor={item => item.recordid.toString()}
    />
  );
}



ListScreen.navigationOptions = {
  title: "Stations",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
});
