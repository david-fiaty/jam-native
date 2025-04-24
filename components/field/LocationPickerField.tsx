import { StyleSheet, TouchableOpacity } from "react-native";
import { BaseProps } from "@/constants/Types";
import InputTextField from "../field/InputTextField";
import IconView from "../view/IconView";

type Props = BaseProps & {
  placeholder?: any;
  latitude?: any;
  longitude?: any;
};

const LocationPickerField = ({ placeholder, latitude, longitude }: Props) => {
  const value = latitude && longitude ? `${latitude},${longitude}` : '';

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {}}
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
