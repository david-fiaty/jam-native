import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { setModalConfig } from "@/redux/slices/ModalSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { ModalConfig } from "@/constants/ModalConfig";
import ScreenView from "../view/ScreenView";
import BoxView from "../view/BoxView";
import DeviceManager from "@/manager/DeviceManager";
import FooterNavigation from "../navigation/FooterNavigation";
import JamsList from "../list/JamsList";
import ScreenManager from "@/manager/ScreenManager";
import HeaderNavigation from "../navigation/HeaderNavigation";

const JamsScreen = React.memo(() => {
  const dispatch = useDispatch();
  const route = useRoute();
  const activeModal = ScreenManager.getActiveModal();
  
  useEffect(() => {
    dispatch(setModalConfig(ModalConfig));
  }, [ModalConfig]);

  return (  
    <BoxView direction="column" align="flex-start" style={styles.container}>
      {(route.name == "jams" || activeModal?.headerNavigation) && <HeaderNavigation />}

      <BoxView style={Layout.mainContent}>
        <JamsList />
      </BoxView>
      
      {(route.name == "jams" || activeModal?.footerNavigation) && <FooterNavigation />}
    </BoxView>
  );
});

const styles = StyleSheet.create({
  container: {
    //backgroundColor: Colors.white,
    backgroundColor: 'green'
  },
});

export default JamsScreen;
