import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

const UserLocationClass = class UserLocation {
  async get() {

    if (Platform.OS === 'android' && !Device.isDevice) {
      console.log(
        'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
      );
      return;
    }
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    console.log(location);
  
    if (location) {
      return JSON.stringify(location);
    }

    return {};
  }
};

const UserLocation = new UserLocationClass();
export default UserLocation;