import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import { Layout } from '@/constants/Layout';
import BoxView from '../view/BoxView';

type Props = {
  value?: string;
  placeholder?: string;
  containerStyle?: object;
  disabled?: boolean;
  readOnly?: boolean;
  onSubmitEditing?: () => void;
  onChangeText?: (value: any) => void;
};

const InputTextareaField = ({
  value,
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
    if (onChangeText) onChangeText(fieldValue);
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