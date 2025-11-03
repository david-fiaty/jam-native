import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import InputTextField from "../field/InputTextField";
import IconView from "../view/IconView";
import ModalManager from '@/manager/ModalManager';
import FormManager from '@/manager/FormManager';

type Props = {
  resource?: any;
  latitudeKey?: string;
  longitudeKey?: string;
  latitudeValue?: any;
  longitudeValue?: any;
  parentKey?: any;
  rules?: any;


  placeholder?: any;
  latitude?: any;
  longitude?: any;
  onPress: () => void;
  onChangeValue: (data: any) => void;
};

const LocationPickerField = ({
  resource,
  latitudeKey,
  longitudeKey,
  latitudeValue,
  longitudeValue,
  rules,

  placeholder,
  latitude,
  longitude,
}: Props) => {
  const value = latitude?.value && longitude?.value ? `${latitude.value},${longitude.value}` : '';
  const formData: any = useSelector((state: any) => state.form[resource]);

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

  return (
    <>
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
