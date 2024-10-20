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
  const windowHeight = DeviceManager.window.height
  const slideAnim = useRef(new Animated.Value(windowHeight)).current; 
  const [activeScreen, setActiveScreen] = useState('');

  const screenStack = {
    settingsMenu: () => <SettingsMenu />,
    notificationsMenu: () => <NotificationsMenu />,
    searchMenu: () => <SearchMenu />,
  };

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0, 
      duration: 300, 
      useNativeDriver: true, 
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: windowHeight, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideScreens = () => {
    setActiveScreen('');
    slideOut();
  }; 

  const showScreen = (name: string) => {
    setActiveScreen(name);
    slideIn();
  };

  const toggleScreen = (name: string) => {
    if (activeScreen && !name) {
      hideScreens();
    }
    else if (activeScreen == name) {
      hideScreens();
    }
    else if (activeScreen && activeScreen != name) {
      hideScreens();
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
          <Animated.View style={[styles.animatedView, { transform: [{ translateY: slideAnim }] }]}>
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

