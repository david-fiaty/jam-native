import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import ScreenView from "../view/ScreenView";
import BoxView from "../view/BoxView";
import DeviceManager from "@/classes/DeviceManager";
import FooterNavigation from "../navigation/FooterNavigation";
import JamsList from "../list/JamsList";
import ScreenManager from "@/classes/ScreenManager";
import SettingsMenu from "@/components/menu/SettingsMenu";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import SearchView from "@/components/view/SearchView";
import MapView from "@/components/view/MapView";
import AddJamForm from "@/components/form/AddJamForm";
import ProfileForm from "@/components/form/ProfileForm";
import JammersList from "@/components/list/JammersList";
import HostsList from "@/components/list/HostsList";
import SaveJamView from "@/components/view/SaveJamView";
import ShareJamView from "@/components/view/ShareJamView";
import MoreJamView from "@/components/view/MoreJamView";

const screenComponents: any = {
  JamsList: <JamsList />,
  MapView: <MapView />,
  AddJamForm: <AddJamForm />,
  ProfileForm: <ProfileForm />,
  SettingsMenu: <SettingsMenu />,
  NotificationsMenu: <NotificationsMenu />,
  SearchView: <SearchView />,
  JammersList: <JammersList />,
  HostsList: <HostsList />,
  SaveJamView: <SaveJamView />,
  ShareJamView: <ShareJamView />,
  MoreJamView: <MoreJamView />,
};

const JamsScreen = () => {
  // Parameters
  const windowWidth = DeviceManager.window.width;
  const windowHeight = DeviceManager.window.height;
  const [nextModal, setNextModal] = useState(null);
  const [animatedStyle, setAnimatedStyle] = useState(null);
  const route = useRoute();

  // Storage state
  const screenState = useSelector((state: any) => state.screen);

  // Animation references
  const fadeEffectReference = useRef(new Animated.Value(0)).current;
  const slideEffectReference = useRef(new Animated.Value(windowHeight)).current;
  const pushEffectReference = useRef(new Animated.Value(windowWidth)).current;

  // Animation effects
  const animationEffects: any = {
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
  const animationStyles: any = {
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

  // Display
  useEffect(() => {
    const activeModal: any = ScreenManager.getActiveModal();


    if (activeModal) {
      setNextModal(activeModal);
      setAnimatedStyle(animationStyles[activeModal.effect]);
      animationEffects[activeModal.effect](true);
    }
    else if (nextModal) {
      animationEffects[nextModal.effect](false);    
      setTimeout(() => {
        setNextModal(null);
        setAnimatedStyle(animationStyles[nextModal.effect]);
      }, Layout.animation.duration);
    }

    
    console.log(activeModal);
    console.log(nextModal);
    
  }, [screenState]); 
  
  // Render
  return (
    <ScreenView>
      <View style={styles.container}>
        {/* Main content */}
        { !nextModal && 
          <BoxView style={Layout.mainContent}>
            <JamsList />
          </BoxView>
        }

        {/* Modal content */}
        <BoxView style={Layout.modalContainer}>
          <Animated.View style={[Layout.animatedView, animatedStyle]}>
            <BoxView style={Layout.modalContent}>
              {screenComponents?.[nextModal?.name]}
            </BoxView>
          </Animated.View>
        </BoxView>

        {/* Footer navigation */}
        { (route.name == 'jams' || nextModal?.footerNavigation) && <FooterNavigation /> }
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

export default JamsScreen;
