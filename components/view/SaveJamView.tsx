import { View } from "react-native";
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import ShareJamButton from "../button/ShareJamButton";
import ViewMyJamsButton from "../button/ViewMyJamsButton";
import ListView from "./ListView";
import ScreenManager from "@/classes/ScreenManager";

const SaveJamView = () => {
  const data = [
    <ShareJamButton style={Layout.listItem} />,
    <ViewMyJamsButton style={Layout.listItem} />,
  ];

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
