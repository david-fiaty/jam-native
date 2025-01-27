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
import EntityManager from "@/manager/EntityManager";

const JamsScreen = React.memo(() => {
  const dispatch = useDispatch();
  const [jamsData, setJamsData] = useState<any>([]);
  const contentStyle = ScreenManager.getModalSize();
  
  const getJamsData = async () => {
    let idArray: any = SearchManager.getSearchResult('jam');
    
    if (idArray?.length > 0) {
      return await EntityManager.getJams({ items_ids: idArray });
    }
    
    return await EntityManager.listJams();
  };

  useEffect(() => {
    dispatch(setModalConfig(ModalConfig));

    (async () => {
      setJamsData(await getJamsData());
    })();

  }, [ModalConfig]);

  return (  
    <BoxView direction="column" align="flex-start" style={styles.container}>

      <HeaderNavigation />

      <BoxView style={[styles.content, contentStyle]} direction="column" align="center">
        <JamsList data={jamsData} />
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
