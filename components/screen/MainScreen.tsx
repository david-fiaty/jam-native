import React, { useState, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Layout } from '@/constants/Layout';
import ScreenAnimation from '@/classes/ScreenAnimation';
import i18n from '@/translation/i18n'; 
import ScreenView from '../view/ScreenView';
import IconView from '../view/IconView';
import BoxView from '../view/BoxView';
import DeviceManager from '@/classes/DeviceManager';
import SettingsMenu from '@/components/menu/SettingsMenu';
import NotificationsMenu from '@/components/menu/NotificationsMenu';
import SearchMenu from '@/components/menu/SearchMenu';
import MapView from '@/components/view/MapView';
import AddJamForm from '@/components/form/AddJamForm';
import ProfileForm from '@/components/form/ProfileForm';

const MainScreen = () => {  
  const [activeScreen, setActiveScreen] = useState('');
  const slideEffect = useRef(new Animated.Value(DeviceManager.window.height)).current; 
  const pushEffect = useRef(new Animated.Value(DeviceManager.window.width)).current; 
  const fadeEffect = useRef(new Animated.Value(0)).current; 
  const screens = {
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
    ScreenAnimation[screens[name]?.effect + 'In'](slideEffect).start();
  };

  const hideScreen = (name: string) => {
    setActiveScreen('');
    ScreenAnimation[`${screens[name]?.effect}Out`](slideEffect).start();
  }; 

  const getEffectStyle = () => {
    if (screens[activeScreen]?.effect == 'fade') {
      return { opacity: fadeEffect };
    }

    if (screens[activeScreen]?.effect == 'slide') {
      return { transform: [{ translateY: slideEffect }] };
    }

    if (screens[activeScreen]?.effect == 'push') {
      return { transform: [{ translateX: pushEffect }] };
    }

    return {};
  };
  
  return (
    <ScreenView>
      <View style={styles.container}>
        {/* Main content */}
        <BoxView style={Layout.modalContainer}>
          <Animated.View style={[Layout.animatedView]}>
            <BoxView style={Layout.modalContent}>
              { activeScreen && screens[activeScreen].component() }
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
  footer: Layout.footer,
});

export default MainScreen;
