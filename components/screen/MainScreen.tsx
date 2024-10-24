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
  // Parameters
  const windowWidth = DeviceManager.window.width;
  const windowHeight = DeviceManager.window.height;
  const [currentScreen, setCurrentScreen] = useState(null);
  const [animatedStyle, setAnimatedStyle] = useState(null);

  // Store state
  const dispatch = useDispatch();
  const tabState = useSelector((state) => state.tab);

  // Animation references
  const fadeEffectReference = useRef(new Animated.Value(0)).current;
  const slideEffectReference = useRef(new Animated.Value(windowHeight)).current;
  const pushEffectReference = useRef(new Animated.Value(windowWidth)).current;

  // Animation effects
  const animationEffects = {
    slide: (show?: boolean) => {
      Animated.timing(slideEffectReference, {
        toValue: show ? 0 : windowHeight, 
        duration: Layout.animation.duration, 
        useNativeDriver: true, 
      }).start();
    },
    fade: (show?: boolean) => {
      Animated.timing(fadeEffectReference, {
        toValue: show ? 1 : 0, 
        duration: Layout.animation.duration, 
        useNativeDriver: true, 
      }).start();
    },
    push: (show?: boolean) => {
      Animated.timing(pushEffectReference, {
        toValue: show ? 0 : windowWidth, 
        duration: Layout.animation.duration, 
        useNativeDriver: true, 
      }).start();
    },
  };
  
  // Animation styles
  const animationStyles = {
    fade: { 
      opacity: fadeEffectReference,
    },
    slide: {
      transform: [
        { 
          translateY: slideEffectReference,
        }
      ],
    },
    push: { 
      transform: [
        { 
          translateX: pushEffectReference,
        },
      ],
    },
  };

  // Tab navigation
  const toggleTab = (tabName?: string) => {
    dispatch(setTabActive(tabName));
  };

  // Get the active screen
  const getActiveScreen = (state: object) => {
    let activeTab = state.find(item => item.active === true);
    let activeScreen = activeTab ? Screens.find(item => item.name == activeTab.name) : null;

    return activeScreen;
  };

  // Display
  useEffect(() => {
    const activeScreen = getActiveScreen(tabState);

    if (activeScreen) {
      setCurrentScreen(activeScreen);
      setAnimatedStyle(animationStyles[activeScreen.effect]);
      animationEffects[activeScreen.effect](true);
    }
    else if (currentScreen) {
      animationEffects[currentScreen.effect](false);    
      setTimeout(() => {
        setCurrentScreen(null);
        setAnimatedStyle(animationStyles[currentScreen.effect]);
      }, Layout.animation.duration);
    }
  }, [tabState]); 
  
  // Render
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
          <Animated.View style={[Layout.animatedView, animatedStyle]}>
            <BoxView style={Layout.modalContent}>
              {currentScreen?.component?.()}
            </BoxView>
          </Animated.View>
        </BoxView>

        {/* Bottom navigation */}
        <BoxView direction="row" align="center" justify="space-around" style={Layout.footer}>
          <IconView
            name="location"
            theme="clear"
            size={22}
            onPress={() => dispatch(setTabActive('MapView'))}
          />
          <IconView
            name="plus"
            theme="clear"
            size={22}
            onPress={() => dispatch(setTabActive('AddJamForm'))}
          />
          <IconView
            name="user"
            theme="clear"
            size={22}
            onPress={() => dispatch(setTabActive('ProfileForm'))}
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
