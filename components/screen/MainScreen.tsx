import React, { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { Layout } from '@/constants/Layout';
import i18n from '@/translation/i18n'; 
import ScreenView from '../view/ScreenView';
import IconView from '../view/IconView';
import BoxView from '../view/BoxView';
import LogoView from '../view/LogoView';
import DeviceManager from '@/classes/DeviceManager';
import TextView from '../view/TextView';

export default () => {  
  const windowHeight = DeviceManager.window.height
  const slideAnim = useRef(new Animated.Value(windowHeight)).current; 

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 100, 
      duration: 500, 
      useNativeDriver: true, 
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: windowHeight, 
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const loadComponent = (name: string) => {
    console.log(name);
  };

  return (
    <ScreenView>
      <View style={styles.container}>

        {/* Top navigation */}
        <BoxView direction="row" justify="space-between">
          <BoxView direction="row">
            <TouchableOpacity onPress={() => {}}>
              <LogoView size={styles.headerLogo} />
            </TouchableOpacity>
          </BoxView>
          <BoxView direction="row"> 
            <IconView name="menu" theme="primary" size={22} onPress={() => loadComponent('settingsMenu')} />
            <IconView label="15+" theme="secondary" size={13} onPress={slideIn} />
            <IconView name="search" theme="clear" size={22} onPress={slideIn} />
          </BoxView>
        </BoxView>

        {/* Main content */}
        <BoxView style={styles.content}>
          <Animated.View style={[styles.animatedView, { transform: [{ translateY: slideAnim }] }]}>
            <BoxView style={styles.container}>
              <TextView>{i18n.t('welcome')}</TextView>
              <IconView name="menu" theme="primary" size={22} onPress={slideOut} />
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
    backgroundColor: 'red',
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
    bottom: 0,
    width: '100%',
    height: 500, 
    backgroundColor: 'lightblue',
  },
  content: {
    backgroundColor: 'green',
    flexGrow: 1,
  },
});

