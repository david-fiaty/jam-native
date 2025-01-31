import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';
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
import ModalView from "../view/ModalView";

const MainScreen = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
        style={styles.content}
      >
        <JamsList />
      </BoxView>
      
      <FooterNavigation />

      <ModalView />
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
