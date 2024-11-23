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

const SaveJamView = () => {
  const [entity, setEntity] = useState<any>(null);
  const entityId = ScreenManager.getActiveScreen()?.entityId;

  console.log(entityId);

  const data = [
    <ShareJamButton style={Layout.listItem} />,
    <ViewMyJamsButton style={Layout.listItem} />,
  ];

  if (false) return <SpinnerView />;

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
