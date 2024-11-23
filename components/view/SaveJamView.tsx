import { useState } from 'react';
import { View } from "react-native";
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import ShareJamButton from "../button/ShareJamButton";
import ViewMyJamsButton from "../button/ViewMyJamsButton";
import ListView from "./ListView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import DataManager from "@/manager/DataManager";
import EntityManager from '@/manager/EntityManager';

const SaveJamView = () => {
  const [entity, setEntity] = useState<any>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const entityId = ScreenManager.getActiveScreen()?.entityId;

  if (!entity) {
    EntityManager.findJam(entityId).then((item: any) => {
      setEntity(item);
    });
  }

  if (!isSaved) {

  }


  console.log(entityId);

  const data = [
    <ShareJamButton style={Layout.listItem} />,
    <ViewMyJamsButton style={Layout.listItem} />,
  ];

  if (!entity) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Jam is now saved to your jams')}
        onPress={() => ScreenManager.toggleModal({
          name: 'SaveJamView',
        })}
      />
      <View style={Layout.borderedListContainer}>
        <ListView
          data={data}
          renderItem={(row: any) => data[row.index]}
        />
      </View>
    </BoxView>
  );
};

export default SaveJamView;
