import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';
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

const modalPosition: any = ScreenManager.getModalPosition();
const modalSize: any = ScreenManager.getModalSize();

const JamsScreen = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const contentStyle = ScreenManager.getModalSize();
  
  const loadModalConfig = () => {
    dispatch(setModalConfig(ScreenManager.getModalConfig()));
  };

  const renderModalContent = () => {
    return ScreenManager.getModalContent();
  };

  const isModalVisible = () => {
    return ScreenManager.isModalActive();    
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
        isVisible={isModalVisible()}
        coverScreen={false}
        hasBackdrop={false}
        style={styles.modalContainer}
      >
        {isModalVisible() && renderModalContent()}
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
    position: 'absolute',
    top: modalPosition.y,
    left: modalPosition.x,
    width: modalSize.width,
    height: modalSize.height,
    backgroundColor: Colors.white,
    margin: 0,
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
