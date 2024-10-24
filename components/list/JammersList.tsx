import { StyleSheet, View, FlatList } from "react-native";
import TextView from "../view/TextView";
import BoxView from "../view/BoxView";
import ApiClient from "@/classes/ApiClient";

const JammersList = () => {
  const data = ApiClient.get('jammers');

  return (
    <View style={styles.container}>
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
