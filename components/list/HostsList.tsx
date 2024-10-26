import { StyleSheet, View, TouchableOpacity } from "react-native";
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

const HostsList = () => {
  const data = ApiClient.get('hosts');
  const dispatch = useDispatch();

  const renderItem = (item, index) => (
    <TouchableOpacity onPress={() => console.log('clicked')}>
      <BoxView direction="row" align="center" justify="flex-start" style={styles.listItem}>
        <IconView name="user" theme="tertiary" />
        <TextView>{item.name}</TextView>
      </BoxView>
    </TouchableOpacity>
  );

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Jam hosts')}
        onPress={() => dispatch(setActiveScreen('HostsList'))}
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

const styles = StyleSheet.create({
  listItem: {
    padding: Layout.space.small,
  },
});

export default HostsList;
