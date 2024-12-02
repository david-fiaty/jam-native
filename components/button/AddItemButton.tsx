import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import i18n from "@/translation/i18n";
import TextView from "../view/TextView";
import IconView from "../view/IconView";

type Props = {
  onPress?: () => void;
};

const AddItemButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
    width: 96.7,
    height: 96.7,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddItemButton;
