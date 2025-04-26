import { StyleSheet, TouchableOpacity } from "react-native";
import InputTextField from "../field/InputTextField";
import IconView from "../view/IconView";

type Props = {
  resource: string,
  placeholder?: any;
  latitude?: any;
  longitude?: any;
};

const LocationPickerField = ({ resource, placeholder, latitude, longitude }: Props) => {
  const value = latitude?.value && longitude?.value ? `${latitude.value},${longitude.value}` : '';

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        /*
        onPress={() => ModalManager.toggleModal('LocationMapView', { 
          resource: resource,
          latitude: latitude,
          longitude: longitude,
        })}
          */
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
