import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { Layout } from "@/constants/Layout";
import JamViewHeader from "./jam-view/JamViewHeader";
import JamViewImage from "./jam-view/JamViewImage";
import JamViewToolbar from "./jam-view/JamViewToolbar";
import JamViewDetails from "./jam-view/JamViewDetails";
import EntityManager from "@/manager/EntityManager";

type Props = {
  jamId?: any;
  isPublic?: boolean;
  onListItemAction?: () => void;
};

const JamView = ({ jamId, isPublic, onListItemAction }: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [jamData, setJamData] = useState<any>(null);
  const appState = useSelector((state: any) => state.app);
  const userState = useSelector((state: any) => state.user);
  const searchState = useSelector((state: any) => state.search);

  const getJamData = async () => {    
    let currentResults: any = JSON.parse(searchState.currentResults);
    let data = (currentResults.jam || []).find((o: any) => o.id == jamId);

    if (!data) {
      data = (await EntityManager.getJams([jamId]))?.[0];
    }     

    return data;
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setJamData(await getJamData());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, jamId]);

  return (
    <View style={styles.container}>
      <JamViewHeader row={jamData} />
      <JamViewImage row={jamData} />
      <JamViewToolbar
        row={jamData} 
        profileData={userState.profileData} 
        onListItemAction={onListItemAction}
      />
      <JamViewDetails row={jamData} sectorsData={appState.sectorsData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    marginBottom: Layout.space.base*1.5,
    borderColor: Layout.colors.primary,
  },
});

export default JamView;
