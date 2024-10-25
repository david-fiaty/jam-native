import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux';
import { setTabActive } from "@/redux/slices/TabSlice";
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import ShareButton from "../button/ShareButton";
import ViewMyJamsButton from "../button/ViewMyJamsButton";

const SaveJamView = () => {
  const dispatch = useDispatch();

  const data = [
    <ShareButton style={Layout.listItem} />,
    <ViewMyJamsButton style={Layout.listItem} />,
  ];

  return (
    <BoxView direction="column">
      <BackButton
        title={i18n.t('Jam is now saved to your jams')}
        onPress={() => dispatch(setTabActive('SaveJamView'))}
      />
      <View style={Layout.borderedListContainer}>
        <FlatList
          data={data}
          numColumns={1}
          scrollEnabled={true}
          horizontal={false}
          contentContainerStyle={Layout.list}
          renderItem={({item, index}) => data[index]}
        />
      </View>
    </BoxView>
  );
};

export default SaveJamView;
