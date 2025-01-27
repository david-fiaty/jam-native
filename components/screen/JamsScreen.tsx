import React, { useState, useEffect } from "react";
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
import SpinnerView from "../view/SpinnerView";
import SearchManager from "@/manager/SearchManager";

const JamsScreen = React.memo(() => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [jamsIds, setJamsIds] = useState<any>([]);
  const contentStyle = ScreenManager.getModalSize();

  useEffect(() => {
    dispatch(setModalConfig(ModalConfig));

    (async () => {
      setJamsIds(await SearchManager.getSearchResult('jam'));
      setIsLoaded(true);
    })();
    
    setIsLoaded(true);
  }, [isLoaded, ModalConfig]);

  if (!isLoaded) return <SpinnerView />;

  console.log(jamsIds);

  return (  
    <BoxView direction="column" align="flex-start" style={styles.container}>
      <HeaderNavigation />

      <BoxView style={[styles.content, contentStyle]} direction="column" align="center">
        <JamsList idArray={jamsIds}/>
      </BoxView>
      
      <FooterNavigation />
    </BoxView>
  );
});

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
