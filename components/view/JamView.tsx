import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector, shallowEqual } from 'react-redux';
import { Layout } from "@/constants/Layout";
import JamViewHeader from "./jam-view/JamViewHeader";
import JamViewImage from "./jam-view/JamViewImage";
import JamViewToolbar from "./jam-view/JamViewToolbar";
import JamViewDetails from "./jam-view/JamViewDetails";
import EntityManager from "@/manager/EntityManager";

type Props = {
  jamId?: any;
  itemData?: any;
  isPublic?: boolean;
  onListItemAction?: () => void;
};

const JamView = ({ jamId, itemData, isPublic, onListItemAction }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [jamData, setJamData] = useState<any>(null);
  const appState = useSelector((state: any) => state.app, shallowEqual);
  const userState = useSelector((state: any) => state.user, shallowEqual);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setJamData(itemData || await EntityManager.findJam(jamId));
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, jamId, itemData]);

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
    width: '100%',
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    marginBottom: Layout.space.base*1.5,
    borderColor: Layout.colors.primary,
  },
});

export default JamView;
