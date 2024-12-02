import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import i18n from "@/translation/i18n";
import TextView from "../view/TextView";
import IconView from "../view/IconView";

type Props = {
  key?: any,
  onPress?: () => void;
};

const AddItemButton = ({ key, onPress }: Props) => {
  return (
    <TouchableOpacity key={key} onPress={onPress}>
      <View style={styles.container}>
        <View>
          <IconView name="plus" theme="secondary" size={16} />
        </View>
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
