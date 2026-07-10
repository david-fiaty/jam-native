import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import IconView from "../view/IconView";
import MediaManager from "@/manager/MediaManager";

type Props = {
  label?: any,
  width?: any,
  height?: any,
  onPress?: () => void,
};

const AddItemButton = ({ label, width, height, onPress }: Props) => {
  let imageSize = MediaManager.getThumbnailSize();
  width = width ? width : imageSize.width;
  height = height ? height : imageSize.height;

  return (
    <TouchableOpacity onPress={onPress} style={{width: width, height: height}}>
      <View style={styles.container}>
        <View>
          <IconView name="plus" theme="secondary" size={16} />
        </View>

        { label?.length > 0 && <TextView>{label}</TextView> }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Layout.colors.secondary,
    borderRadius: Layout.space.base,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%',
  },
});

export default AddItemButton;
