import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClearIcon from '@/components/icons/ClearIcon';
import DeviceManager from '@/classes/DeviceManager';
import AddJamScreen from '@/components/screens/AddJamScreen';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ViewportContainer from '@/components/base/ViewportContainer';
import MapScreen from '@/components/screens/MapScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import JamsScreen from '@/components/screens/JamsScreen';
import Slideshow from '@/components/slideshow/Slideshow';
import BottomLinks from '@/components/navigation/BottomLinks';
import JamLogo from '@/components/images/JamLogo';
import LoginSignupButton from '@/components/buttons/LoginSignupButton';
import FullScreenView from '@/components/base/FullScreenView';

const Index = () => {
  const [mapTabActive, setMapTabActive] = useState(false);
  const [addTabActive, setAddTabActive] = useState(false);
  const [profileTabActive, setProfileTabActive] = useState(false);
  
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const WelcomeScreen = () => {
    return (
      <View style={styles.container}>
        <FullScreenView>
          <JamLogo width={110} height={110} />    
          <Slideshow />
          <LoginSignupButton />
          <BottomLinks />
        </FullScreenView>
      </View>
    );
  };


  useEffect(() => {
    // Check AsyncStorage when the app is launched to decide if the component should be shown
    const checkIfFirstLaunch = async () => {
      const alreadyShown = await AsyncStorage.getItem('componentShown');
      if (!alreadyShown) {
        setIsComponentVisible(true);
        // Mark the component as shown for this session
        await AsyncStorage.setItem('componentShown', 'true');
      }
    };

    checkIfFirstLaunch();

    // Listener to detect when the app comes to the foreground
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // Cleanup the listener when component unmounts
      appStateListener.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: any) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // App has been relaunched, check the component visibility again
      checkIfComponentShouldBeVisible();
    }
    setAppState(nextAppState);
  };

  const checkIfComponentShouldBeVisible = async () => {
    const alreadyShown = await AsyncStorage.getItem('componentShown');
    if (!alreadyShown) {
      setIsComponentVisible(true);
      await AsyncStorage.setItem('componentShown', 'true');
    }
  };

  return (  
    <ViewportContainer>
      <View style={styles.container}>
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.item} onPress={() => {
            setMapTabActive(!mapTabActive);
            setAddTabActive(false);
            setProfileTabActive(false);
          }}>
            <ClearIcon 
              name="location" 
              size={GlobalStyles.footer.icon.size} 
              containerStyle={mapTabActive ? styles.active : {}}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {
            setMapTabActive(false);
            setAddTabActive(!addTabActive);
            setProfileTabActive(false);
          }}>
            <ClearIcon 
              name="plus" 
              size={GlobalStyles.footer.icon.size} 
              containerStyle={addTabActive ? styles.active : {}}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {
            setMapTabActive(false);
            setAddTabActive(false);
            setProfileTabActive(!profileTabActive);
          }}>
            <ClearIcon 
              name="user" 
              size={GlobalStyles.footer.icon.size} 
              containerStyle={profileTabActive ? styles.active : {}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.modal}>
          {isComponentVisible && <WelcomeScreen />}
          {!mapTabActive && !addTabActive && !profileTabActive && (<JamsScreen />)}
          {mapTabActive && (<MapScreen />)}
          {addTabActive && (<AddJamScreen />)}
          {profileTabActive && (<ProfileScreen />)}
        </View>
      </View>
    </ViewportContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: GlobalStyles.space.base,
    borderTopWidth: 1,
    borderTopColor: Colors.primary,
    zIndex: 100,
  },
  item: {
    paddingHorizontal: GlobalStyles.space.container*2,
  },
  active: {
    backgroundColor: Colors.tertiary,
    borderRadius: 4,
  },
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: GlobalStyles.footer.height,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    width: '100%',
    padding: GlobalStyles.space.container,
    paddingBottom: 0,
    height: DeviceManager.modal.height - GlobalStyles.header.height + GlobalStyles.space.base,
    zIndex: 0,
  },
});

export default Index;