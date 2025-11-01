import React, { useState, useEffect, JSX } from "react";
import { StyleSheet } from "react-native";
import { Input } from "@rneui/themed";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import FormManager from "@/manager/FormManager";

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  formData?: any;
  keyboardType?: any;
  value?: string;
  placeholder?: string;
  containerStyle?: object;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  disabled?: boolean;
  secureTextEntry?: boolean;
  spellCheck?: boolean;
  readOnly?: boolean,
  onChangeText?: (value: string) => void;
  onSubmitEditing?: () => void;
};

const InputTextField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  formData,
  keyboardType,
  value,
  placeholder,
  containerStyle,
  leftIcon,
  rightIcon,
  disabled,
  secureTextEntry,
  spellCheck,
  readOnly,
  onChangeText,
  onSubmitEditing,
}: Props) => {
  const [currentValue, setCurrentValue] = useState<any>('');

  const disabledStyle: any = {
    opacity: disabled ? 0.4 : 1,
  };

  const changeTextEvent = (fieldValue: any) => {
    setCurrentValue(fieldValue);
    if (onChangeText) {
      onChangeText(fieldValue)
    }
    else if (resource && fieldKey && !parentKey) {
      FormManager.updateField(resource, fieldKey, fieldValue, rules);
    }
    else if (resource && fieldKey && parentKey) {
      FormManager.updateField(resource, `${parentKey}.${fieldKey}`, {
        ...(formData?.[parentKey] || {}),
        ...{ fieldKey: value },
      }, rules)
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
    <BoxView style={[styles.container, disabledStyle]}>
      <Input
        keyboardType={keyboardType}
        textAlignVertical="center"
        numberOfLines={1}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        placeholder={placeholder}
        placeholderTextColor={Layout.colors.primary}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={containerStyle ?? {}}
        multiline={false}
        editable={!disabled}
        secureTextEntry={secureTextEntry}
        spellCheck={spellCheck}
        value={currentValue}
        readOnly={readOnly}
        onChangeText={changeTextEvent}
        onSubmitEditing={submitEditingEvent}
      />

      {FormManager.renderError(fieldKey, parentKey)}
    </BoxView>
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

export default InputTextField;
