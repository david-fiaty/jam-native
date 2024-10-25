import { View, FlatList } from "react-native";
import { useDispatch } from 'react-redux';
import { setTabActive } from "@/redux/slices/TabSlice";
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

const MoreJamView = () => {
  const dispatch = useDispatch();

  const data = [
    <SaveJamButton style={Layout.listItem} />,
    <ShareJamButton style={Layout.listItem} />,
    <AddToProjectButton style={Layout.listItem} />,
    <ViewProjectButton style={Layout.listItem}/>,
    <EditJamButton style={Layout.listItem} />,
    <ReportJamButton style={Layout.listItem} />,
    <DeleteJamButton style={Layout.listItem} />,
  ];

  return (
    <BoxView direction="column">
      <BackButton
        title={i18n.t('More')}
        onPress={() => dispatch(setTabActive('MoreJamView'))}
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

export default MoreJamView;
