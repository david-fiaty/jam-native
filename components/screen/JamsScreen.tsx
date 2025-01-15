import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { Modals } from "@/constants/Modals";
import ScreenView from "../view/ScreenView";
import BoxView from "../view/BoxView";
import DeviceManager from "@/manager/DeviceManager";
import FooterNavigation from "../navigation/FooterNavigation";
import JamsList from "../list/JamsList";
import ScreenManager from "@/manager/ScreenManager";
import SettingsMenu from "@/components/menu/SettingsMenu";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import SearchView from "@/components/view/SearchView";
import JamsMapView from "@/components/view/JamsMapView";
import JamForm from "@/components/form/JamForm";
import AddProjectForm from "../form/AddProjectForm";
import ProfileForm from "@/components/form/ProfileForm";
import JammersList from "@/components/list/JammersList";
import HostsList from "@/components/list/HostsList";
import SavedJamAction from "@/components/action/SavedJamAction";
import LikedJamAction from "../action/LikedJamAction";
import MoreJamActionsView from "@/components/view/MoreJamActionsView";
import AddedJamAction from "../action/AddedJamAction";
import CollaboratorsList from "../list/CollaboratorsList";
import SectorsList from "../list/SectorsList";
import LocationMapView from "../view/LocationMapView";
import SelectJamsForm from "../form/SelectJamsForm";
import CountriesList from "../list/CountriesList";
import AddJamToProjectForm from "../form/AddJamToProjectForm";
import SearchManager from "@/manager/SearchManager";

const screenComponents: any = {
  JamsList: <JamsList />,
  JamsMapView: <JamsMapView />,
  JamForm: <JamForm />,
  AddProjectForm: <AddProjectForm />,
  SelectJamsForm: <SelectJamsForm />,
  ProfileForm: <ProfileForm />,
  AddJamToProjectForm: <AddJamToProjectForm />,
  SettingsMenu: <SettingsMenu />,
  NotificationsMenu: <NotificationsMenu />,
  SearchView: <SearchView />,
  JammersList: <JammersList />,
  CollaboratorsList: <CollaboratorsList />,
  SectorsList: <SectorsList />,
  CountriesList: <CountriesList />,
  LocationMapView: <LocationMapView />,
  HostsList: <HostsList />,
  SavedJamAction: <SavedJamAction />,
  LikedJamAction: <LikedJamAction />,
  AddedJamAction: <AddedJamAction />,
  MoreJamActionsView: <MoreJamActionsView />,
};

const JamsScreen = () => {
  // Parameters
  const route = useRoute();
  const windowWidth = DeviceManager.window.width;
  const windowHeight = DeviceManager.window.height;
  const [currentScreen, setCurrentScreen] = useState<any>(null);
  const [animatedStyle, setAnimatedStyle] = useState<any>(null);
  const [searchResultsIds, setSearchResultsIds] = useState<any[]>([]);
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
        },
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

  // Get the active modal window
  const getActiveModal = (state: object) => {
    let screen = ScreenManager.getActiveScreen();
    let activeModal = screen
      ? Modals.find((item) => item.name == screen.name)
      : null;

    return activeModal;
  };

  // Get the current search results IDs
  const getSearchResultsIds = async () => {
    const searchResults: any = await SearchManager.getResult('jazz');
    const jamResultsIds: any = (searchResults?.jam || []).map((o: any) => o.id);
    
    return jamResultsIds;
  };


  // Display
  useEffect(() => {
    (async () => {
      const activeModal: any = getActiveModal(screenState);
      setSearchResultsIds(await getSearchResultsIds());

      if (activeModal) {
        setCurrentScreen(activeModal);
        setAnimatedStyle(animationStyles[activeModal.effect]);
        animationEffects[activeModal.effect](true);
      } else if (currentScreen) {
        animationEffects[currentScreen.effect](false);
        setTimeout(() => {
          setCurrentScreen(null);
          setAnimatedStyle(animationStyles[currentScreen.effect]);
        }, Layout.animation.duration);
      }  
    })();

  }, [screenState, animationStyles, animationEffects, currentScreen]);

  console.log(searchResultsIds)

  // Render
  return (
    <ScreenView>
      <View style={styles.container}>
        {/* Main content */}
        {!currentScreen && (
          <BoxView style={Layout.mainContent}>
            <JamsList 
              showSpinner={true} 
              idArray={[]} // Todo - Apply search results
            />
          </BoxView>
        )}

        {/* Modal content */}
        {
          <BoxView style={Layout.modalContainer}>
            <Animated.View style={[Layout.animatedView, animatedStyle]}>
              <BoxView style={Layout.modalContent}>
                {screenComponents?.[currentScreen?.name]}
              </BoxView>
            </Animated.View>
          </BoxView>
        }

        {/* Footer navigation */}
        {(route.name == "jams" || currentScreen?.footerNavigation) && (
          <FooterNavigation />
        )}
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: DeviceManager.window.height,
    backgroundColor: Colors.white,
  },
});

export default JamsScreen;
