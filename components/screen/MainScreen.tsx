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
import { active } from "@/redux/slices/ModalSlice";

const MainScreen = () => {
  // Parameters
  const windowWidth = DeviceManager.window.width;
  const windowHeight = DeviceManager.window.height;
  const [currentScreen, setCurrentScreen] = useState(null);

  // Store state
  const dispatch = useDispatch();
  const tabState = useSelector((state) => state.tab);

  // Animation references
  const fadeEffectReference = useRef(new Animated.Value(0)).current;
  const slideEffectReference = useRef(new Animated.Value(windowHeight)).current;
  const pushEffectReference = useRef(new Animated.Value(windowWidth)).current;

  // Animation effects
  const animations = {
    slide: (show?: boolean) => {
      Animated.timing(slideEffectReference, {
        toValue: show ? 0 : windowHeight, 
        duration: 500, 
        useNativeDriver: true, 
      }).start();
    },
    fade: (show?: boolean) => {
      Animated.timing(fadeEffectReference, {
        toValue: show ? 1 : 0, 
        duration: 500, 
        useNativeDriver: true, 
      }).start();
    },
    push: (show?: boolean) => {
      Animated.timing(pushEffectReference, {
        toValue: show ? 0 : windowWidth, 
        duration: 500, 
        useNativeDriver: true, 
      }).start();
    },
  };
  
  // Tab navigation
  const toggleTab = (tabName?: string) => {
    dispatch(setTabActive(tabName));
  };

  const getActiveScreen = () => {
    let activeTab = tabState.find(item => item.active === true);
    let activeScreen = activeTab ? Screens.find(item => item.name == activeTab.name) : null;

    return activeScreen;
  };

  // Prepare display
  useEffect(() => {
    const activeScreen = getActiveScreen();

    if (activeScreen) {
      setCurrentScreen(activeScreen.component());
      animations['slide'](true);
    }
    else {
      setCurrentScreen(null);
      animations['slide'](false);
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
              { currentScreen }
            </BoxView>
          </Animated.View>
        </BoxView>

        {/* Bottom navigation */}
        <BoxView direction="row" align="center" justify="space-around" style={Layout.footer}>
          <IconView
            name="location"
            theme="clear"
            size={22}
            onPress={() => toggleTab('MapView')}
          />
          <IconView
            name="plus"
            theme="clear"
            size={22}
            onPress={() => toggleTab('AddJamForm')}
          />
          <IconView
            name="user"
            theme="clear"
            size={22}
            onPress={() => toggleTab('ProfileForm')}
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
