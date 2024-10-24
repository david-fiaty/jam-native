import { StyleSheet, View, FlatList, Touchable, TouchableOpacity } from "react-native";
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

const JammersList = () => {
  const data = ApiClient.get('jammers');
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <BackButton
        title={i18n.t('Jammers')}
        onPress={() => dispatch(setTabActive('JammersList'))}
      />
      <View style={styles.listContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  listContainer: {
    ...Layout.listContainer,
    ...{
      borderWidth: 1,
      borderRadius: Layout.radius.round,
      borderColor: Colors.primary,
      padding: Layout.space.base,
    },
  },
  listItem: {
    padding: Layout.space.small,
  },
});

export default JammersList;
