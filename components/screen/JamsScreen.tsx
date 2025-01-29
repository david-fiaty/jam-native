import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setModalConfig } from "@/redux/slices/ModalSlice";
import { ModalConfig } from "@/constants/ModalConfig";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import Modal from "react-native-modal";
import BoxView from "../view/BoxView";
import FooterNavigation from "../navigation/FooterNavigation";
import JamsList from "../list/JamsList";
import ScreenManager from "@/manager/ScreenManager";
import HeaderNavigation from "../navigation/HeaderNavigation";
import SearchManager from "@/manager/SearchManager";
import SpinnerView from "../view/SpinnerView";
import BackButton from "../button/BackButton";

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

  const getModalContentStyle = useCallback((): any => {
    if (isModalVisible()) {
      return ScreenManager.getModalSize();
    }

    return {};
  }, []);

  const loadModalConfig = useCallback(() => {
    dispatch(setModalConfig(ModalConfig.map(({ component, ...rest }) => ({ ...rest }))));
  }, []);

  const renderModalContent = () => {
    return ModalConfig.find((o: any) => o.name == ScreenManager.getActiveModal()?.name)?.component;
  };

  const renderModalTitle = () => {
    if (isModalVisible() && ScreenManager.getActiveModal()?.params?.backTitle) {
      let activeModal: any = ScreenManager.getActiveModal();
      let modalName: string = ScreenManager.getActiveModal()?.name;
      let modalTitle: string = activeModal?.params?.backTitle;

      return (
        <BoxView direction="row">
          <BackButton
            title={modalTitle}
            onPress={() => ScreenManager.toggleModal(modalName)}
            containerStyle={styles.modalTitle}
          />
        </BoxView>
      );
    }
    
    return <></>;
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
        justify="center"
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
        {renderModalTitle()}
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
  modalTitle: {
    marginLeft: Layout.space.base*1.5,
    width: '100%',
  },
});

export default JamsScreen;
