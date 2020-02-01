import React, { useContext } from 'react';
import {
  StyleSheet,
  View,

  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';


import { VelibContext } from '../App';

export default function BookmarkListScreen({ navigation }) {

  const context = useContext(VelibContext);
  const bookmarks = context.bookmarks;
  console.log('bookmarks: ' + JSON.stringify(bookmarks));

  const onItemSelected = station => {
    navigation.navigate('Detail', {station: station})
  }

  return (
      <View style={{flex: 1}}>
      {
        bookmarks.length == 0 ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Pas de favoris</Text>
            </View>      
        : 
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
            data={bookmarks}
            keyExtractor={item => item.recordid.toString()}
            />
        }
      </View>
    
  );
}

BookmarkListScreen.navigationOptions = {
    title: 'Favoris',
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
    no_records_style: {
        borderRadius: 15,
        backgroundColor: 'grey',
        borderColor: 'white',
        textDecorationColor: 'white',
        marginBottom: 15,
        paddingBottom: 8
    },
});