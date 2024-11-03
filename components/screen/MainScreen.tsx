import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { Modals } from "@/constants/Modals";
import { Screens } from "@/constants/Screens";
import ScreenView from "../view/ScreenView";
import BoxView from "../view/BoxView";
import DeviceManager from "@/classes/DeviceManager";
import FooterNavigation from "../navigation/FooterNavigation";
import JamsList from "../list/JamsList";

const MainScreen = () => {
  // Parameters
  const windowWidth = DeviceManager.window.width;
  const windowHeight = DeviceManager.window.height;
  const [currentScreen, setCurrentScreen] = useState(null);
  const [animatedStyle, setAnimatedStyle] = useState(null);
  const route = useRoute();

  // Storage state
  const screenState = useSelector((state: any) => state.screen);

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

  // Get the active screen
  const getActiveScreen = (state: object) => {
    let screen = state.find(item => item.active === true);
    let activeScreen = screen ? Modals.find(item => item.name == screen.name) : null;

    return activeScreen;
  };

  // Display
  useEffect(() => {
    const activeScreen = getActiveScreen(screenState);

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
  }, [screenState]); 
  
  // Render
  return (
    <ScreenView>
      <View style={styles.container}>
        {/* Main content */}
        { !currentScreen && 
          <BoxView style={Layout.mainContent}>
            <JamsList />
          </BoxView>
        }

        {/* Modal content */}
        <BoxView style={Layout.modalContainer}>
          <Animated.View style={[Layout.animatedView, animatedStyle]}>
            <BoxView style={Layout.modalContent}>
              {Screens?.[currentScreen?.name]}
            </BoxView>
          </Animated.View>
        </BoxView>

        {/* Footer navigation */}
        { (route.name == 'main' || currentScreen?.footerNavigation) && <FooterNavigation /> }
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
