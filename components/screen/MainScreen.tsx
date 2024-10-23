import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import ScreenView from "../view/ScreenView";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import DeviceManager from "@/classes/DeviceManager";
import LogoView from '../view/LogoView';
import { setTabActive } from "@/redux/slices/TabSlice";
import { Screens } from "@/constants/Screens";

const MainScreen = () => {

  const windowWidth = DeviceManager.window.width;
  const windowHeight = DeviceManager.window.height;

  const dispatch = useDispatch();
  const tabState = useSelector((state) => state.tab);

  const slideEffectReference = useRef(
    new Animated.Value(windowHeight)
  ).current;

  const pushEffectReference = useRef(
    new Animated.Value(-windowWidth)
  ).current;

  const fadeEffectReference = useRef(new Animated.Value(0)).current;
  
  const slideIn = () => {
    Animated.timing(slideEffectReference, {
      toValue: 0, 
      duration: 500, 
      useNativeDriver: true, 
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideEffectReference, {
      toValue: windowHeight, 
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeEffectReference, {
      toValue: 1, 
      duration: 500, 
      useNativeDriver: true, 
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeEffectReference, {
      toValue: 0, 
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const pushIn = () => {
    Animated.timing(pushEffectReference, {
      toValue: 0, 
      duration: 500, 
      useNativeDriver: true, 
    }).start();
  };

  const pushOut = () => {
    Animated.timing(pushEffectReference, {
      toValue: windowWidth, 
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const toggleTab = (tabName: string) => {
    if (tabName == tabState.active) {
      dispatch(setTabActive(tabName));
    }
  };

  
  console.log(tabState);

  const slideEffectReferenceStyle = { transform: [{ translateY: slideEffectReference }] };
  const fadeEffectReferenceStyle = { opacity: fadeEffectReference };
  const pushEffectReferenceStyle = { transform: [{ translateX: pushEffectReference }] };

  const animatedViewStyle = {
    ...Layout.animatedView,
    ...{
      top: 0,
      left: 0,
    },
    ...pushEffectReferenceStyle,
  };

  return (
    <ScreenView>
      <View style={styles.container}>
        {/* Top navigation */}
        <BoxView direction="row" align="center" justify="space-between" style={Layout.header}>
          <BoxView direction="row" align="center" style={Layout.headerRight}>
            <TouchableOpacity onPress={() => {}}>
              <LogoView size={Layout.logo} />
            </TouchableOpacity>
          </BoxView>
          <BoxView direction="row" align="center" justify="space-between">
            <BoxView direction="row" align="center" style={Layout.headerRight}> 
              <IconView name="menu" theme="secondary" size={22} onPress={() => pushIn()} />
              <IconView label="15+" theme="secondary" size={13} onPress={() => pushOut()} />
              <IconView name="search" theme="clear" size={22} onPress={() => {}} />
            </BoxView>
          </BoxView>
        </BoxView>

        {/* Main content */}
        <BoxView style={Layout.modalContainer}>
          <Animated.View style={animatedViewStyle}>
            <BoxView style={Layout.modalContent}>
              { /*activeScreen && Screens[activeScreen].component()*/}
              {/*!activeScreen && Screens['jamsList'].component()*/}
            </BoxView>
          </Animated.View>
        </BoxView>

        {/* Bottom navigation */}
        <BoxView direction="row" align="center" justify="space-around" style={Layout.footer}>
          <IconView
            name="location"
            theme="clear"
            size={22}
            onPress={() => toggleTab('jamList')}
            //onPress={() => fadeIn()}
            //onPress={() => slideIn()}
            //onPress={() => toggleScreen("mapView")}
          />
          <IconView
            name="plus"
            theme="clear"
            size={22}
            onPress={() => pushOut()}
            //onPress={() => fadeOut()}
            //onPress={() => slideOut()}
          />
          <IconView
            name="user"
            theme="clear"
            size={22}
            //onPress={() => toggleScreen("profileForm")}
          />
        </BoxView>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: Colors.white,
  },
});

export default MainScreen;
