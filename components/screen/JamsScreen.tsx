import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';
import { setModalConfig } from "@/redux/slices/ModalSlice";
import { ModalConfig } from "@/constants/ModalConfig";
import { Colors } from "@/constants/Colors";
import BoxView from "../view/BoxView";
import FooterNavigation from "../navigation/FooterNavigation";
import JamsList from "../list/JamsList";
import ScreenManager from "@/manager/ScreenManager";
import HeaderNavigation from "../navigation/HeaderNavigation";
import SearchManager from "@/manager/SearchManager";
import SpinnerView from "../view/SpinnerView";

const JamsScreen = () => {
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const contentStyle = ScreenManager.getModalSize();
  
  const loadJamsData = async (value?: any) => {
    setSearchResult(await SearchManager.getSearchResult(value));
  };

  const onSearchSubmit = async (value: any) => {
    await loadJamsData(value);
    console.log('search submit', value);
  };

  useEffect(() => {
    dispatch(setModalConfig(ModalConfig));

    (async () => {
      await loadJamsData();
      setIsLoaded(true);
    })();
  }, [isLoaded, ModalConfig]);

  if (!isLoaded) return <SpinnerView />;

  return (  
    <BoxView direction="column" align="flex-start" style={styles.container}>

      <HeaderNavigation 
        searchResult={searchResult} 
        onSearchSubmit={async (value: any) => await onSearchSubmit(value)} 
      />

      <BoxView style={[styles.content, contentStyle]} direction="column" align="center">
        <JamsList searchResult={searchResult?.jam} />
      </BoxView>
      
      <FooterNavigation searchResult={searchResult} />
      
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
