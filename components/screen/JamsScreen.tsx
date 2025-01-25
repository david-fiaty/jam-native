import React, { useState, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { setModalConfig } from "@/redux/slices/ModalSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { Modals } from "@/constants/Modals";
import ScreenView from "../view/ScreenView";
import BoxView from "../view/BoxView";
import DeviceManager from "@/manager/DeviceManager";
import FooterNavigation from "../navigation/FooterNavigation";
import JamsList from "../list/JamsList";
import ScreenManager from "@/manager/ScreenManager";

const JamsScreen = React.memo(() => {
  // Parameters
  const route = useRoute();
  const dispatch = useDispatch();
  const [currentScreen, setCurrentScreen] = useState<any>(null);
  const [animatedStyle, setAnimatedStyle] = useState<any>(null);
  const activeModal = ScreenManager.getActiveModal();

  const loadModalConfig = () => {
    dispatch(setModalConfig(Modals.map(({component, ...rest}) => ({...rest}))));
  }
  
  useEffect(() => {
    loadModalConfig();
  });

  // Render
  return (
    <ScreenView>
      <View style={styles.container}>
                
                { /*
        <ModalView 
          button={<TextView>{i18n.t('Click here')}</TextView>}
          visible={!!activeModal} 
          //content={activeModal.component} 
        />

        */}
                
        {/* Main content */}
        {!activeModal && (
          <BoxView style={Layout.mainContent}>
            <JamsList />
          </BoxView>
        )}

        {/* Modal content */}
        {activeModal && (
          <BoxView style={Layout.modalContainer}>
            <Animated.View style={[Layout.animatedView, animatedStyle]}>
              <BoxView style={Layout.modalContent}>
                {ScreenManager.getModalContent(activeModal.name)}
              </BoxView>
            </Animated.View>
          </BoxView>
        )}

        {/* Footer navigation */}
        {(route.name == "jams" || currentScreen?.footerNavigation) && (
          <FooterNavigation />
        )}
      </View>
    </ScreenView>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: DeviceManager.window.height,
    backgroundColor: Colors.white,
  },
});

export default JamsScreen;
