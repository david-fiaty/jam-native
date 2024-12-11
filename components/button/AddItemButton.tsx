import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import i18n from "@/translation/i18n";
import TextView from "../view/TextView";
import IconView from "../view/IconView";

type Props = {
  width?: any,
  height?: any,
  onPress?: () => void,
};

const AddItemButton = ({ width, height, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={{width: width, height: height}}>
      <View style={styles.container}>
        <View>
          <IconView name="plus" theme="secondary" size={16} />
        </View>
        <TextView>Add</TextView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    borderRadius: Layout.space.base,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%',
  },
});

export default AddItemButton;
