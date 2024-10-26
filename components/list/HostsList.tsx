import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux';
import { setActiveTab } from "@/redux/slices/TabSlice";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import ApiClient from "@/classes/ApiClient";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";

const HostsList = () => {
  const data = ApiClient.get('hosts');
  const dispatch = useDispatch();

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Jam hosts')}
        onPress={() => dispatch(setActiveTab('HostsList'))}
      />
      <View style={Layout.borderedListContainer}>
        <FlatList
          data={data}
          numColumns={1}
          scrollEnabled={true}
          horizontal={false}
          contentContainerStyle={{}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => console.log('clicked')}>
                <BoxView direction="row" align="center" justify="flex-start" style={styles.listItem}>
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

const styles = StyleSheet.create({
  listItem: {
    padding: Layout.space.small,
  },
});

export default HostsList;
