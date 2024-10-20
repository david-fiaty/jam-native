import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Modal } from 'react-native';
import { Layout } from '@/constants/Layout';
import i18n from '@/translation/i18n'; 
import ScreenView from '../view/ScreenView';
import IconView from '../view/IconView';
import BoxView from '../view/BoxView';
import LogoView from '../view/LogoView';
import DeviceManager from '@/classes/DeviceManager';
import TextView from '../view/TextView';
import SettingsMenu from '../menu/SettingsMenu';
import NotificationsMenu from '../menu/NotificationsMenu';
import SearchMenu from '../menu/SearchMenu';

export default () => {  
  const windowHeight = DeviceManager.window.height;
  const windowWidth = DeviceManager.window.width;

  const slideEffect = useRef(new Animated.Value(windowHeight)).current; 
  const fadeEffect = useRef(new Animated.Value(0)).current; 

  const [activeScreen, setActiveScreen] = useState('');

  const screenStack = {
    settingsMenu: () => <SettingsMenu />,
    notificationsMenu: () => <NotificationsMenu />,
    searchMenu: () => <SearchMenu />,
  };

  const slideIn = () => {
    Animated.timing(slideEffect, {
      toValue: 0, 
      duration: 300, 
      useNativeDriver: true, 
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideEffect, {
      toValue: windowHeight, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeEffect, {
      toValue: 1, 
      duration: 300, 
      useNativeDriver: true, 
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeEffect, {
      toValue: 0, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideScreen = () => {
    setActiveScreen('');
    //slideOut();
    fadeOut();
  }; 

  const showScreen = (name: string) => {
    setActiveScreen(name);
    //slideIn();
    fadeIn();
  };

  const toggleScreen = (name: string) => {
    if (activeScreen && !name) {
      hideScreen();
    }
    else if (activeScreen == name) {
      hideScreen();
    }
    else if (activeScreen && activeScreen != name) {
      hideScreen();
      showScreen(name);
    }
    else {
      showScreen(name);
    }
  };

  return (
    <ScreenView>
      <View style={styles.container}>

        {/* Top navigation */}
        <BoxView direction="row" justify="space-between">
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
        <BoxView style={styles.content}>
         {/* <Animated.View style={[styles.animatedView, { transform: [{ translateY: slideEffect }] }]}> */}
         <Animated.View style={[styles.animatedView, { opacity: fadeEffect }]}>
            <BoxView style={styles.modal}>
              <TextView>{i18n.t('welcome')}</TextView>
              <IconView name="menu" theme="primary" size={22} onPress={slideOut} />
              { activeScreen && (<TextView>{activeScreen}</TextView>)}
              { activeScreen && screenStack[activeScreen]()}
            </BoxView>
          </Animated.View>
        </BoxView>

        {/* Bottom navigation */}
        <BoxView direction="row" justify="space-between">
          <BoxView direction="row">
            <TouchableOpacity onPress={() => {}}>
              <LogoView size={styles.headerLogo} />
            </TouchableOpacity>
          </BoxView>
          <BoxView direction="row">
            <IconView name="menu" theme="primary" size={22} />
            <IconView label="15+" theme="secondary" size={13} />
            <IconView name="search" theme="clear" size={22} />
          </BoxView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
    width: Layout.header.logo.width,
    height: Layout.header.logo.height,
  },
  animatedView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: Layout.footer.height,
    width: '100%',
    height: DeviceManager.modalView.height, 
    backgroundColor: 'lightblue',
    opacity: 0,
  },
  modal: {
    backgroundColor: 'blue',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: DeviceManager.modalView.height,
  },
  content: {
    backgroundColor: 'green',
    flexGrow: 1,
  },
});

