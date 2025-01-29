import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';
import { setModalConfig } from "@/redux/slices/ModalSlice";
import { ModalConfig } from "@/constants/ModalConfig";
import { Colors } from "@/constants/Colors";
import { Layout } from '@/constants/Layout';
import Modal from "react-native-modal";
import BoxView from "../view/BoxView";
import FooterNavigation from "../navigation/FooterNavigation";
import JamsList from "../list/JamsList";
import ScreenManager from "@/manager/ScreenManager";
import HeaderNavigation from "../navigation/HeaderNavigation";
import SearchManager from "@/manager/SearchManager";
import SpinnerView from "../view/SpinnerView";
import TextView from "../view/TextView";

const modalPosition: any = ScreenManager.getModalPosition();
const modalSize: any = ScreenManager.getModalSize();

const JamsScreen = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const contentStyle = ScreenManager.getModalSize();
  
  const loadModalConfig = () => {
    let config: any = ModalConfig.map(({ component, ...rest }) => ({ ...rest }));
    dispatch(setModalConfig(config));
  };

  const renderModalContent = () => {
    return <TextView>Ttiub aepinpoeve spm</TextView>
    return ModalConfig.find((o: any) => o.name == 'JamsList').component;
  };

  const getModalVisible = () => {
    return false;
  };

  const loadSearchResult = async (value?: any) => {
    await SearchManager.getSearchResult(value);
  };

  const onSearchSubmit = async (value: any) => {
    await loadSearchResult(value);
  };

  const onSearchClear = async () => {
    await SearchManager.clearSearch();
  };

  useEffect(() => {
    loadModalConfig();

    (async () => {
      await loadSearchResult();
      setIsLoaded(true);
    })();
  }, [isLoaded, ModalConfig]);

  if (!isLoaded) return <SpinnerView />;

  return (  
    <BoxView direction="column" align="flex-start" style={styles.container}>
      <HeaderNavigation 
        onSearchSubmit={async (value: any) => await onSearchSubmit(value)} 
        onSearchClear={async () => await onSearchClear()}
      />

      <BoxView 
        direction="column" 
        align="center"
        style={[styles.content, contentStyle]}
      >
        <JamsList />
      </BoxView>
      
      <FooterNavigation />

      <Modal
        isVisible={getModalVisible()}
        coverScreen={false}
        hasBackdrop={false}
        style={styles.modalContainer}
      >
        {renderModalContent()}
      </Modal>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  content: {
    width: '100%',
    zIndex: 0,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    /*
    position: 'absolute',
    top: modalPosition.y,
    left: modalPosition.x,
    width: modalSize.width,
    */
  },
  modalWrapper: {
    /*
    width: '100%',
    marginTop: 0,
    backgroundColor: Colors.white,
    paddingTop: Layout.space.base*2,
    height: modalSize.height,
    */
  },
  modalContent: {
    /*
    width: '100%',
    flex: 1,
    */
  },
});

export default JamsScreen;
