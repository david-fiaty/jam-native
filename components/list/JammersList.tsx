import { StyleSheet, View, FlatList } from "react-native";
import { useDispatch } from 'react-redux';
import { setTabActive } from "@/redux/slices/TabSlice";
import TextView from "../view/TextView";
import ApiClient from "@/classes/ApiClient";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";

const JammersList = () => {
  const data = ApiClient.get('jammers');
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <BackButton
        title={i18n.t('Jammers')}
        onPress={() => dispatch(setTabActive('JammersList'))}
      />
      <FlatList
        data={data}
        numColumns={1}
        scrollEnabled={true}
        horizontal={false}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item, index}) => {
          return (
            <View style={styles.item}>
              <TextView>{item.name}</TextView>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default JammersList;
