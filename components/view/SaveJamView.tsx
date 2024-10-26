import { View } from "react-native";
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import ShareJamButton from "../button/ShareJamButton";
import ViewMyJamsButton from "../button/ViewMyJamsButton";
import ListView from "./ListView";

const SaveJamView = () => {
  const dispatch = useDispatch();

  const data = [
    <ShareJamButton style={Layout.listItem} />,
    <ViewMyJamsButton style={Layout.listItem} />,
  ];

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Jam is now saved to your jams')}
        onPress={() => dispatch(setActiveScreen('SaveJamView'))}
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

export default SaveJamView;
