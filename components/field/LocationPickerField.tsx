import { StyleSheet, TouchableOpacity } from "react-native";
import InputTextField from "../field/InputTextField";
import IconView from "../view/IconView";
import ModalManager from '@/manager/ModalManager';

type Props = {
  resource?: any;
  latitudeKey?: string;
  longitudeKey?: string;
  latitudeValue?: any;
  longitudeValue?: any;
  parentKey?: any;
  rules?: any;
  placeholder?: any;
};

const LocationPickerField = ({
  resource,
  latitudeKey,
  longitudeKey,
  latitudeValue,
  longitudeValue,
  rules,
  placeholder
}: Props) => {
  const onPressEvent = () => {
    ModalManager.toggleModal('SelectLocationMapView', {
      resource: resource,
      latitude: {
        field: latitudeKey,
        value: latitudeValue,
      },
      longitude: {
        field: longitudeKey,
        value: longitudeValue,
      },
    });
  };

  const getValue = () => {
    return latitudeValue && longitudeValue ? `${latitudeValue},${longitudeValue}` : '';
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={onPressEvent}
      >
        <InputTextField
          value={getValue()}
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
