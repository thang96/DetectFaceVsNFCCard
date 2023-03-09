import React from 'react';
import {Image, Text, View, StyleSheet, Animated} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {CameraDetectScreen, HomeScreen, ResultScreen} from '../../Screens';

const Stack = createStackNavigator();

const HomeNavigation = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={'HomeScreen'}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'CameraDetectScreen'}
        component={CameraDetectScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'ResultScreen'}
        component={ResultScreen}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  view: {justifyContent: 'center', alignItems: 'center'},
  image: {width: 28, height: 28},
  text: {textAlign: 'center', fontSize: 10},
});
export default HomeNavigation;
