import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

export default function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{color: 'white'}}>Home Screen</Text>
        </View>
        <View style={{flex: 1}}>
            <View style={styles.button_style}>
                <Button
                title="Consulter list stations"
                onPress={() => navigation.navigate('Stations')}
                />
            </View>
            <View style={styles.button_style}>
                <Button
                title="Consulter list favoris"
                onPress={() => navigation.navigate('Bookmarks')}
                />
            </View>
        </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
    header: null,
    headerMode: 'none',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0
        }
};

const styles = StyleSheet.create({
  button_style: {
      borderRadius: 15,
      backgroundColor: 'grey',
      borderColor: 'white',
      textDecorationColor: 'white',
      marginBottom: 15,
      paddingBottom: 8
  },
});
