import { View, TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import ApiClient from "@/classes/ApiClient";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ListView from "../view/ListView";

const JammersList = () => {
  const data = ApiClient.get('jammers');
  const dispatch = useDispatch();

  const renderItem = (item, index) => (
    <TouchableOpacity onPress={() => console.log('clicked')}>
      <BoxView direction="row" align="center" justify="flex-start" style={Layout.listItem}>
        <IconView name="user" theme="tertiary" />
        <TextView>{item.name}</TextView>
      </BoxView>
    </TouchableOpacity>
  );

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Jammers')}
        onPress={() => dispatch(setActiveScreen('JammersList'))}
      />
      <View style={Layout.borderedListContainer}>
        <ListView
          data={data}
          renderItem={({item, index}) => renderItem(item, index)}
        />
      </View>
    </BoxView>
  );
};

export default JammersList;
