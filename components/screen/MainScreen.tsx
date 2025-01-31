import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import BoxView from "../view/BoxView";
import FooterNavigation from "../navigation/FooterNavigation";
import JamsList from "../list/JamsList";
import HeaderNavigation from "../navigation/HeaderNavigation";
import SpinnerView from "../view/SpinnerView";
import ModalConfig from "@/constants/ModalConfig";

const MainScreen = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    (async () => {
      setIsLoaded(true);
    })();
  }, [isLoaded, ModalConfig]);

  if (!isLoaded) return <SpinnerView />;

  return (  
    <BoxView direction="column" align="center" style={styles.container}>
      <HeaderNavigation />

      <BoxView 
        direction="column" 
        align="center"
        justify="center"
        style={styles.content}
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
