import { StyleSheet, TouchableOpacity } from "react-native";
import InputTextField from "../field/InputTextField";
import IconView from "../view/IconView";
import ModalManager from '@/manager/ModalManager';
import FormManager from "@/manager/FormManager";

type Props = {
  resource?: any;
  latitudeKey?: any;
  longitudeKey?: any;
  latitudeValue?: any;
  longitudeValue?: any;
  parentKey?: any;
  rules?: any;
  label?: any;
  placeholder?: any;
};

const LocationPickerField = ({
  resource,
  latitudeKey,
  longitudeKey,
  latitudeValue,
  longitudeValue,
  parentKey,
  rules,
  label,
  placeholder
}: Props) => {
  const onPressEvent = () => {
    ModalManager.toggleModal('SelectLocationMapView', {
      resource: resource,
      parentKey: parentKey,
      rules: rules,
      latitude: {
        key: latitudeKey,
        value: latitudeValue,
      },
      longitude: {
        key: longitudeKey,
        value: longitudeValue,
      },
    });
  };

  const getValue = () => {
    return latitudeValue && longitudeValue ? `${latitudeValue},${longitudeValue}` : '';
  };

  return (
    <>
      {FormManager.renderLabel(label, rules)}
      
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

      {(!latitudeValue || !longitudeValue) && FormManager.renderError(latitudeKey, parentKey)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default LocationPickerField;
