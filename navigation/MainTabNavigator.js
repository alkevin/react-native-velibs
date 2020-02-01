import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import MapScreen from '../screens/MapScreen';
import BookmarkListScreen from '../screens/BookmarkListScreen';
import CurrentPositionScreen from '../screens/CurrentPositionScreen';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Bookmarks: BookmarkListScreen
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const StationsStack = createStackNavigator(
  {
    Stations: ListScreen,
    Detail: DetailScreen
  }
);

StationsStack.navigationOptions = {
  tabBarLabel: 'Stations',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-bicycle${focused ? '' : '-outline'}`
          : 'md-bicycle'
      }
    />
  ),
};

const MapStack = createStackNavigator(
  {
    Map: MapScreen,
  }
);

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
      focused={focused} 
      name={
        Platform.OS === 'ios' ? 'ios-map' : 'md-map'} />
  ),
};

const CurrentPositionStack = createStackNavigator(
  {
    Position: CurrentPositionScreen,
  }
);

CurrentPositionStack.navigationOptions = {
  tabBarLabel: 'position',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
      focused={focused} 
      name={
        Platform.OS === 'ios' ? 'ios-locate' : 'md-locate'} />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  StationsStack,
  MapStack,
  CurrentPositionStack,
});