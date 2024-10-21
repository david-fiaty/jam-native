import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Screens } from '@/constants/Screens';
import ScreenAnimation from '@/classes/ScreenAnimation';
import i18n from '@/translation/i18n'; 
import ScreenView from '../view/ScreenView';
import IconView from '../view/IconView';
import BoxView from '../view/BoxView';
import LogoView from '../view/LogoView';
import DeviceManager from '@/classes/DeviceManager';

export default () => {  
  const [activeScreen, setActiveScreen] = useState('');
  const slideEffect = useRef(new Animated.Value(DeviceManager.window.height)).current; 
  const pushEffect = useRef(new Animated.Value(DeviceManager.window.width)).current; 
  const fadeEffect = useRef(new Animated.Value(0)).current; 

  const toggleScreen = (name: string) => {
    if (activeScreen && !name || activeScreen == name) {
      hideScreen(activeScreen);
    }
    else if (activeScreen && activeScreen != name) {
      hideScreen(name);
      showScreen(name);
    }
    else {
      showScreen(name);
    }
  };

  const showScreen = (name: string) => {
    setActiveScreen(name);
    ScreenAnimation[Screens[name].effect + 'In'](slideEffect).start();
  };

  const hideScreen = (name: string) => {
    setActiveScreen('');
    ScreenAnimation[`${Screens[name].effect}Out`](slideEffect).start();
  }; 

  const getEffectStyle = () => {
    if (Screens[activeScreen]?.effect == 'fade') {
      return { opacity: fadeEffect };
    }

    if (Screens[activeScreen]?.effect == 'slide') {
      return { transform: [{ translateY: slideEffect }] };
    }

    if (Screens[activeScreen]?.effect == 'push') {
      return { transform: [{ translateX: pushEffect }] };
    }

    return {};
  };
  
  return (
    <ScreenView>
      <View style={styles.container}>

        {/* Top navigation */}
        <BoxView direction="row" justify="space-between" style={styles.header}>
          <BoxView direction="row">
            <TouchableOpacity onPress={() => {activeScreen && toggleScreen('')}}>
              <LogoView size={styles.headerLogo} />
            </TouchableOpacity>
          </BoxView>
          <BoxView direction="row"> 
            <IconView name="menu" theme="primary" size={22} onPress={() => toggleScreen('settingsMenu')} />
            <IconView label="15+" theme="secondary" size={13} onPress={() => toggleScreen('notificationsMenu')} />
            <IconView name="search" theme="clear" size={22} onPress={() => toggleScreen('searchMenu')} />
          </BoxView>
        </BoxView>

        {/* Main content */}
        <BoxView style={Layout.modalContainer}>
          <Animated.View style={[Layout.animatedView, getEffectStyle]}>
            <BoxView style={Layout.modalContent}>
              { activeScreen && Screens[activeScreen].component() }
            </BoxView>
          </Animated.View>
        </BoxView>

        {/* Bottom navigation */}
        <BoxView direction="row" justify="space-around" style={styles.footer}>
          <IconView name="location" theme="clear" size={22} onPress={() => toggleScreen('mapView')} />
          <IconView name="plus" theme="clear" size={22} onPress={() => toggleScreen('addJamForm')} />
          <IconView name="user" theme="clear" size={22} onPress={() => toggleScreen('profileForm')} />
        </BoxView>
      </View>        
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: 'gray',
  },
  header: Layout.header,
  footer: Layout.footer,
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.space.base,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.space.base,
  },
  headerLogo: {
    width: Layout.headerLogo.width,
    height: Layout.headerLogo.height,
  },
});

