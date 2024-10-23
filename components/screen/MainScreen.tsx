import React, { useState, useRef, useEffect } from "react";
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
    new Animated.Value(windowWidth)
  ).current;

  const fadeEffectReference = useRef(new Animated.Value(0)).current;

  const animations = {
    slide: (isVisible?: boolean) => {
      Animated.timing(slideEffectReference, {
        toValue: isVisible ? windowHeight : 0, 
        duration: 500, 
        useNativeDriver: true, 
      }).start();
    },
    fade: (isVisible?: boolean) => {
      Animated.timing(fadeEffectReference, {
        toValue: isVisible ? 0 : 1, 
        duration: 500, 
        useNativeDriver: true, 
      }).start();
    },
    push: (isVisible?: boolean) => {
      Animated.timing(pushEffectReference, {
        toValue: isVisible ? windowWidth : 0, 
        duration: 500, 
        useNativeDriver: true, 
      }).start();
    },
  };
  
  const toggleTab = (tabName?: string) => {
    if (tabName && tabName != tabState.active) {
      dispatch(setTabActive(tabName));
    }
    else if (!tabName || tabName == tabState.active) {
      dispatch(setTabActive(null));
    }
  };

  useEffect(() => {
    if (tabState.active) {
      animations[Screens[tabState.active].effect](false);
    }
    else {
      animations['slide'](true);
    }
  }, [tabState]); 

  const slideEffectStyle = { transform: [{ translateY: slideEffectReference }] };
  const fadeEffectStyle = { opacity: fadeEffectReference };
  const pushEffectStyle = { transform: [{ translateX: pushEffectReference }] };

  const animatedStyle = {
    ...Layout.animatedView,
    ...slideEffectStyle,
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
              <IconView name="menu" theme="secondary" size={22} onPress={() => {}} />
              <IconView label="15+" theme="secondary" size={13} onPress={() => {}} />
              <IconView name="search" theme="clear" size={22} onPress={() => {}} />
            </BoxView>
          </BoxView>
        </BoxView>

        {/* Main content */}
        <BoxView style={Layout.modalContainer}>
          <Animated.View style={animatedStyle}>
            <BoxView style={Layout.modalContent}>
              { /*tabState.active && Screens[tabState.active].component() */}
              { true && Screens['jamsList'].component() }
            </BoxView>
          </Animated.View>
        </BoxView>

        {/* Bottom navigation */}
        <BoxView direction="row" align="center" justify="space-around" style={Layout.footer}>
          <IconView
            name="location"
            theme="clear"
            size={22}
            onPress={() => toggleTab('mapView')}
          />
          <IconView
            name="plus"
            theme="clear"
            size={22}
            onPress={() => toggleTab('addJamForm')}
          />
          <IconView
            name="user"
            theme="clear"
            size={22}
            onPress={() => toggleTab('profileForm')}
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
