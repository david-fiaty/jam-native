import { View } from "react-native";
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import SaveJamButton from "../button/SaveJamButton";
import ShareJamButton from "../button/ShareJamButton";
import AddToProjectButton from "../button/AddToProjectButton";
import ViewProjectButton from "../button/ViewProjectButton";
import EditJamButton from "../button/EditJamButton";
import ReportJamButton from "../button/ReportJamButton";
import DeleteJamButton from "../button/DeleteJamButton";
import ListView from "./ListView";
import ScreenManager from "@/manager/ScreenManager";

const data = [
  <SaveJamButton style={Layout.listItem} />,
  <ShareJamButton style={Layout.listItem} />,
  <AddToProjectButton style={Layout.listItem} />,
  <ViewProjectButton style={Layout.listItem} />,
  <EditJamButton style={Layout.listItem} />,
  <ReportJamButton style={Layout.listItem} />,
  <DeleteJamButton style={Layout.listItem} />,
];

const MoreJamView = () => {
  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('More')}
        onPress={() => ScreenManager.toggleModal({
          name: 'MoreJamView',
        })}
      />
      <View style={Layout.borderedListContainer}>
        <ListView
          data={data}
          renderItem={(item: any) => data[item.index]}
        />
      </View>
    </BoxView>
  );
};

export default MoreJamView;
