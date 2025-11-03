import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import InputTextField from "../field/InputTextField";
import IconView from "../view/IconView";

type Props = {
  resource: string,
  placeholder?: any;
  latitude?: any;
  longitude?: any;
  onPress: () => void;
  onChangeValue: (data: any) => void;
};

const LocationPickerField = ({ resource, placeholder, latitude, longitude, onPress, onChangeValue}: Props) => {
  const value = latitude?.value && longitude?.value ? `${latitude.value},${longitude.value}` : '';
  const formData: any = useSelector((state: any) => state.form[resource]);

  useEffect(() => {
    onChangeValue(formData);
  }, [formData]);

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
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
