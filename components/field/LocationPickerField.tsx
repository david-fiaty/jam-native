import { StyleSheet, TouchableOpacity } from "react-native";
import { BaseProps } from "@/constants/Types";
import InputTextField from "../field/InputTextField";
import IconView from "../view/IconView";

type Props = BaseProps & {
  label?: any;
  placeholder?: any;
  latitude?: any;
  longitude?: any;
  onPressEvent: () => void;
};

const LocationPickerField = ({ label, placeholder, latitude, longitude, onPressEvent }: Props) => {
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
          placeholder={placeholder}
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
