import { View } from "react-native";
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import CopyJamLinkButton from "../button/CopyJamLinkButton";
import ListView from "./ListView";
import ShareJamButton from "../button/ShareJamButton";
import ScreenManager from "@/manager/ScreenManager";

const ShareJamView = () => {
  const data = [
    <CopyJamLinkButton style={Layout.listItem} />,
    <ShareJamButton style={Layout.listItem} />,
  ];

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Share Jam')}
        onPress={() => ScreenManager.toggleModal({
          name: 'ShareJamView',
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

export default ShareJamView;
