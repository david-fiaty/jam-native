import { View, FlatList } from "react-native";
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import CopyJamLinkButton from "../button/CopyJamLinkButton";
import InstagramShareButton from "../button/InstagramShareButton";
import FacebookShareButton from "../button/FacebookShareButton";
import TwitterShareButton from "../button/TwitterShareButton";

const ShareJamView = () => {
  const dispatch = useDispatch();

  const data = [
    <CopyJamLinkButton style={Layout.listItem} />,
    <InstagramShareButton style={Layout.listItem} />,
    <FacebookShareButton style={Layout.listItem} />,
    <TwitterShareButton style={Layout.listItem} />,
  ];

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Share Jam')}
        onPress={() => dispatch(setActiveScreen('ShareJamView'))}
      />
      <View style={Layout.borderedListContainer}>
        <FlatList
          data={data}
          numColumns={1}
          scrollEnabled={true}
          horizontal={false}
          contentContainerStyle={{}}
          renderItem={({item, index}) => data[index]}
        />
      </View>
    </BoxView>
  );
};

export default ShareJamView;
