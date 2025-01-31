import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setModalConfig } from "@/redux/slices/ModalSlice";
import { setIsSearching } from "@/redux/slices/SearchSlice";
import { Colors } from "@/constants/Colors";
import BoxView from "../view/BoxView";
import FooterNavigation from "../navigation/FooterNavigation";
import JamsList from "../list/JamsList";
import HeaderNavigation from "../navigation/HeaderNavigation";
import SearchManager from "@/manager/SearchManager";
import SpinnerView from "../view/SpinnerView";
import MessageView from "../view/MessageView";
import ModalConfig from "@/constants/ModalConfig";

const MainScreen = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const modalConfig: any = ModalConfig.build();

  const loadModalConfig = useCallback(() => {
    dispatch(setModalConfig(modalConfig.map(({ component, ...rest }) => ({ ...rest }))));
  }, []);

  const loadSearchResult = async (value?: any) => {
    await SearchManager.getSearchResult(value);
  };

  const onSearchEdit = async (value: any) => {
    await loadSearchResult(value);
  };

  const onSearchSubmit = async (value: any) => {
    dispatch(setIsSearching(true));
    await loadSearchResult(value);
    dispatch(setIsSearching(false));
  };

  const onSearchClear = async () => {
    dispatch(setIsSearching(true));
    await SearchManager.clearSearch();
    dispatch(setIsSearching(false));
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
    <BoxView direction="column" align="center" style={styles.container}>
      <MessageView />

      <HeaderNavigation 
        onSearchEdit={async (value: any) => await onSearchEdit(value)} 
        onSearchSubmit={async (value: any) => await onSearchSubmit(value)} 
        onSearchClear={async () => await onSearchClear()}
      />

      <BoxView 
        direction="column" 
        align="center"
        justify="center"
        style={[styles.content]}
      >
        <JamsList />
      </BoxView>
      
      <FooterNavigation />

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

export default MainScreen;
