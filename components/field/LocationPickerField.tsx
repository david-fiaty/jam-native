import { StyleSheet, TouchableOpacity } from "react-native";
import { BaseProps } from "@/constants/Types";
import i18n from "@/translation/i18n";
import InputTextField from "../field/InputTextField";
import IconView from "../view/IconView";
import ScreenManager from "@/manager/ScreenManager";

type Props = BaseProps & {
  latitude?: any;
  longitude?: any;
};

const LocationPickerField = ({ latitude, longitude }: Props) => {
  const value = latitude && longitude ? `${latitude},${longitude}` : '';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => ScreenManager.toggleModal("LocationMapView")}
    >
      <InputTextField
        value={value}
        readOnly={true}
        rightIcon={<IconView name="location" theme="transparent" />}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default LocationPickerField;
