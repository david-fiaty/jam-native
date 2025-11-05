import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import BoxView from "../view/BoxView";
import FormManager from "@/manager/FormManager";
import TextView from "../view/TextView";

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: string;
  label?: any;
  placeholder?: any;
  disabled?: boolean;
  containerStyle?: any;
  onChangeValue?: (value: boolean) => void;
};

const InputPhoneField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  value,
  label,
  placeholder,
  disabled,
  containerStyle,
  onChangeValue
}: Props) => {
  const [currentValue, setCurrentValue] = useState<any>('');

  const onChangeEvent = (fieldValue: any) => {
    setCurrentValue(fieldValue);

    if (onChangeValue) {
      onChangeValue(fieldValue)
    }
    else {
      FormManager.updateField(resource, fieldKey, fieldValue, rules, parentKey);
    }
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <>
      {FormManager.renderLabel(label, rules)}

      <BoxView
        direction="row"
        style={styles.container}
      >
        <TextView>Phone field</TextView>
      </BoxView>

      {FormManager.renderError(fieldKey, parentKey)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainerStyle: {
    width: '100%',
    height: '100%',
  },
});

export default InputPhoneField;
