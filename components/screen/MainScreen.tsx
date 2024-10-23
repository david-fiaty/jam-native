import React, { useState, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Layout } from "@/constants/Layout";
import ScreenAnimation from "@/classes/ScreenAnimation";
import i18n from "@/translation/i18n";
import ScreenView from "../view/ScreenView";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import DeviceManager from "@/classes/DeviceManager";
import SettingsMenu from "@/components/menu/SettingsMenu";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import SearchMenu from "@/components/menu/SearchMenu";
import MapView from "@/components/view/MapView";
import AddJamForm from "@/components/form/AddJamForm";
import ProfileForm from "@/components/form/ProfileForm";
import { Colors } from "@/constants/Colors";
import JamsList from "../list/JamsList";

const MainScreen = () => {

  const windowWidth = DeviceManager.window.width;
  const windowHeight = DeviceManager.window.height;

  const [activeScreen, setActiveScreen] = useState("");

  const slideEffect = useRef(
    new Animated.Value(windowHeight)
  ).current;

  const pushEffect = useRef(
    new Animated.Value(-windowWidth)
  ).current;

  const fadeEffect = useRef(new Animated.Value(0)).current;
  
  const screens = {
    jamsList: {
      effect: 'fade',
      component: () => <JamsList />,
    },
    settingsMenu: {
      effect: 'push',
      component: () => <SettingsMenu />,
    },
    notificationsMenu: {
      effect: 'fade',
      component: () => <NotificationsMenu />,
    },
    searchMenu: {
      effect: 'slide',
      component: () => <SearchMenu />,
    },
    mapView: {
      effect: 'fade',
      component: () => <MapView />,
    },
    addJamForm: {
      effect: 'fade',
      component: () => <AddJamForm />,
    },
    profileForm: {
      effect: 'fade',
      component: () => <ProfileForm />,
    },
  };

  const slideIn = () => {
    Animated.timing(slideEffect, {
      toValue: 0, 
      duration: 500, 
      useNativeDriver: true, 
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideEffect, {
      toValue: windowHeight, 
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeEffect, {
      toValue: 1, 
      duration: 500, 
      useNativeDriver: true, 
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeEffect, {
      toValue: 0, 
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const pushIn = () => {
    Animated.timing(pushEffect, {
      toValue: 0, 
      duration: 500, 
      useNativeDriver: true, 
    }).start();
  };

  const pushOut = () => {
    Animated.timing(pushEffect, {
      toValue: windowWidth, 
      duration: 500,
      useNativeDriver: true,
    }).start();
  };



  const slideEffectStyle = { transform: [{ translateY: slideEffect }] };
  const fadeEffectStyle = { opacity: fadeEffect };
  const pushEffectStyle = { transform: [{ translateX: pushEffect }] };

  const animatedViewStyle = {
    ...Layout.animatedView,
    ...{
      top: 0,
      left: 0,
    },
    ...pushEffectStyle,
  };

  return (
    <ScreenView>
      <View style={styles.container}>
        {/* Main content */}
        <BoxView style={Layout.modalContainer}>
          <Animated.View style={animatedViewStyle}>
            <BoxView style={Layout.modalContent}>
              {activeScreen && screens[activeScreen].component()}
              {!activeScreen && screens['jamsList'].component()}
            </BoxView>
          </Animated.View>
        </BoxView>

        {/* Bottom navigation */}
        <BoxView direction="row" align="center" justify="space-around" style={Layout.footer}>
          <IconView
            name="location"
            theme="clear"
            size={22}
            onPress={() => pushIn()}
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
            onPress={() => toggleScreen("profileForm")}
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
