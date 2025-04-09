import { StyleSheet, TouchableOpacity } from "react-native";
import { BaseProps } from "@/constants/Types";
import InputTextField from "../field/InputTextField";
import IconView from "../view/IconView";

type Props = BaseProps & {
  label?: any;
  latitude?: any;
  longitude?: any;
  onPressEvent: () => void;
};

const LocationPickerField = ({ label, latitude, longitude, onPressEvent }: Props) => {
  const value = latitude && longitude ? `${latitude},${longitude}` : '';

  return (
    <>
      {label}
      <TouchableOpacity
        style={styles.container}
        onPress={onPressEvent}
      >
        <InputTextField
          value={value}
          readOnly={true}
          rightIcon={<IconView name="location" theme="transparent" />}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default LocationPickerField;
