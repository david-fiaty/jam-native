import { View } from "react-native";
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import CopyJamLinkButton from "../button/CopyJamLinkButton";
import ListView from "./ListView";
import ShareJamButton from "../button/ShareJamButton";

const ShareJamView = () => {
  const dispatch = useDispatch();

  const data = [
    <CopyJamLinkButton style={Layout.listItem} />,
    <ShareJamButton style={Layout.listItem} />,
  ];

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Share Jam')}
        onPress={() => dispatch(setActiveScreen('ShareJamView'))}
      />
      <View style={Layout.borderedListContainer}>
        <ListView
          data={data}
          renderItem={({item, index}) => data[index]}
        />
      </View>
    </BoxView>
  );
};

export default ShareJamView;
