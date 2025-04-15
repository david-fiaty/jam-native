import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import BoxView from "../view/BoxView";
import JamsList from "../list/JamsList";
import SpinnerView from "../view/SpinnerView";

const MainScreen = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    (async () => {
      setIsLoaded(true);
    })();
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  return (  
    <BoxView direction="column" align="center" style={styles.container}>
      <BoxView 
        direction="column" 
        align="center"
        justify="center"
        style={styles.content}
      >
        <JamsList />
      </BoxView>
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
