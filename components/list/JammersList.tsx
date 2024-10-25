import { View, FlatList, TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux';
import { setActiveTab } from "@/redux/slices/TabSlice";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import ApiClient from "@/classes/ApiClient";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";

const JammersList = () => {
  const data = ApiClient.get('jammers');
  const dispatch = useDispatch();

  return (
    <BoxView direction="column">
      <BackButton
        title={i18n.t('Jammers')}
        onPress={() => dispatch(setActiveTab('JammersList'))}
      />
      <View style={Layout.borderedListContainer}>
        <FlatList
          data={data}
          numColumns={1}
          scrollEnabled={true}
          horizontal={false}
          contentContainerStyle={Layout.list}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => console.log('clicked')}>
                <BoxView direction="row" align="center" justify="flex-start" style={Layout.listItem}>
                  <IconView name="user" theme="tertiary" />
                  <TextView>{item.name}</TextView>
                </BoxView>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </BoxView>
  );
};

export default JammersList;
