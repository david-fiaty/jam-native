import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux';
import { setTabActive } from "@/redux/slices/TabSlice";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import ApiClient from "@/classes/ApiClient";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import { Colors } from "@/constants/Colors";

const HostsList = () => {
  const data = ApiClient.get('hosts');
  const dispatch = useDispatch();

  return (
    <BoxView direction="column">
      <BackButton
        title={i18n.t('Jam hosts')}
        onPress={() => dispatch(setTabActive('HostsList'))}
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
                <BoxView direction="row" align="center" justify="flex-start" style={styles.listItem}>
                  <IconView name="user" size={22} theme="tertiary" />
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
