import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import { Layout } from '@/constants/Layout';
import BoxView from '../view/BoxView';
import FormManager from "@/manager/FormManager";
import InputTextField from "./InputTextField";

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: string;
  label?: string;
  placeholder?: string;
  containerStyle?: object;
  disabled?: boolean;
  readOnly?: boolean;
  onSubmitEditing?: () => void;
  onChangeText?: (value: any) => void;
};

const InputTextareaField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  value,
  label,
  placeholder,
  containerStyle,
  disabled,
  readOnly,
  onChangeText,
  onSubmitEditing,
}: Props) => {
  const [currentValue, setCurrentValue] = useState<any>('');

  const changeTextEvent = (fieldValue: any) => {
    setCurrentValue(fieldValue);
    if (onChangeText) {
      onChangeText(fieldValue)
    }
    else {
      FormManager.updateField(resource, fieldKey, fieldValue, rules, parentKey);
    }
  };

  const submitEditingEvent = () => {
    if (onSubmitEditing) onSubmitEditing()
    else if (onChangeText) onChangeText(currentValue);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <BoxView style={styles.container}>
      {FormManager.renderLabel(label, rules)}


      <InputTextField
        resource={resource}
        fieldKey={fieldKey}
        parentKey={parentKey}
        //value={phoneNumberFieldValue || ''}
        rules={[]}

        multiline={true}
        textAlignVertical="top"
        numberOfLines={10}
        disabled={disabled}
        placeholder={placeholder}
        readOnly={readOnly}
      //placeholder={inputPlaceholder}

      //onChangeText={onChangePhoneValue}
      //containerStyle={styles.inputTextField}
      />

      <Input
        style={styles.element}
        containerStyle={[Layout.formField, styles.element]}
        placeholder={placeholder}
        placeholderTextColor={Layout.colors.primary}
        multiline={true}
        textAlignVertical="top"
        numberOfLines={10}
        editable={!disabled}
        value={currentValue}
        onChangeText={changeTextEvent}
        onSubmitEditing={submitEditingEvent}
        readOnly={readOnly}
      />

      {fieldKey && FormManager.renderError(fieldKey)}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  element: {
    width: '100%',
    paddingTop: Layout.space.base / 2,
    height: 'auto',
  },
});

export default InputTextareaField;