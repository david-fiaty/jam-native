import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { setModalConfig } from "@/redux/slices/ModalSlice";
import { ModalConfig } from "@/constants/ModalConfig";
import { Colors } from "@/constants/Colors";
import BoxView from "../view/BoxView";
import FooterNavigation from "../navigation/FooterNavigation";
import JamsList from "../list/JamsList";
import ScreenManager from "@/manager/ScreenManager";
import HeaderNavigation from "../navigation/HeaderNavigation";

const JamsScreen = React.memo(() => {
  const dispatch = useDispatch();
  const route = useRoute();
  const activeModal = ScreenManager.getActiveModal();
  const containerStyle = ScreenManager.getModalSize();
  
  useEffect(() => {
    dispatch(setModalConfig(ModalConfig));
  }, [ModalConfig]);

  return (  
    <BoxView direction="column" align="flex-start" style={styles.container}>
      <HeaderNavigation />

      <BoxView style={[styles.mainContent, containerStyle]} direction="column" align="center">
        <JamsList />
      </BoxView>
      
      <FooterNavigation />
    </BoxView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  mainContent: {
    width: '100%',
    zIndex: 0,
  },
});

export default JamsScreen;
