import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setModalConfig } from "@/redux/slices/ModalSlice";
import { ModalConfig } from "@/constants/ModalConfig";
import { Colors } from "@/constants/Colors";
import Modal from "react-native-modal";
import BoxView from "../view/BoxView";
import FooterNavigation from "../navigation/FooterNavigation";
import JamsList from "../list/JamsList";
import ScreenManager from "@/manager/ScreenManager";
import HeaderNavigation from "../navigation/HeaderNavigation";
import SearchManager from "@/manager/SearchManager";
import SpinnerView from "../view/SpinnerView";

const JamsScreen = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const modalState = useSelector((state: any) => state.modal);

  const getModalContainerStyle = (): any => {
    if (isModalVisible()) {
      let modalPosition: any = ScreenManager.getModalPosition();
      let modalSize: any = ScreenManager.getModalSize();

      return {
        position: 'absolute',
        top: modalPosition.y,
        left: modalPosition.x,
        width: modalSize.width,
        height: modalSize.height,
        backgroundColor: Colors.white,
        margin: 0,
      };
    }
  
    return {};
  };

  const getModalContentStyle = (): any => {
    if (isModalVisible()) {
      return ScreenManager.getModalSize();
    }

    return {};
  };

  const loadModalConfig = () => {
    let config: any = ModalConfig.map(({ component, ...rest }) => ({ ...rest }));
    dispatch(setModalConfig(config));
  };

  const renderModalContent = () => {
    return ModalConfig.find((o: any) => o.name == ScreenManager.getActiveModal()?.name)?.component;
  };

  const isModalVisible = () => {
    return modalState.active.length > 0;    
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
        style={[styles.content, getModalContentStyle()]}
      >
        <JamsList />
      </BoxView>
      
      <FooterNavigation />

      <Modal
        isVisible={isModalVisible()}
        coverScreen={false}
        hasBackdrop={false}
        style={getModalContainerStyle()}
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
});

export default JamsScreen;
