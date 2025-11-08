import React, { useState, useEffect, JSX } from "react";
import { StyleSheet } from "react-native";
import { Input } from "@rneui/themed";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import FormManager from "@/manager/FormManager";

type Props = {
  theme?: string;
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  keyboardType?: any;
  label?: any;
  value?: string;
  placeholder?: string;
  inputStyle?: object;
  containerStyle?: object;
  inputContainerStyle?: object;
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
  theme,
  resource,
  fieldKey,
  parentKey,
  rules,
  keyboardType,
  value,
  label,
  placeholder,
  containerStyle,
  inputStyle,
  inputContainerStyle,
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

  if (theme == 'white') {
    containerStyle = {
      ...(containerStyle || {}),
      ...styles.containerStyleWhite,
    };
  }

  const disabledStyle: any = {
    opacity: disabled ? 0.4 : 1,
  };

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
    <BoxView style={[styles.container, disabledStyle]}>
      {FormManager.renderLabel(label, rules)}

      <Input
        keyboardType={keyboardType}
        textAlignVertical="center"
        numberOfLines={1}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        placeholder={placeholder}
        placeholderTextColor={Layout.colors.primary}
        inputStyle={[styles.inputStyle, inputStyle]}
        inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
        containerStyle={[Layout.formField, containerStyle ?? {}]}
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
    flexGrow: 1,
  },
  containerStyleWhite: {
    backgroundColor: Layout.colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Layout.colors.primary,
  },
  inputContainerStyle: {
    width: '100%',
    borderBottomWidth: 0,
  },
  inputStyle: {
    padding: 0,
    margin: 0,
    color: Layout.colors.primary,
    fontSize: Layout.fontSize.base,
  },
});

export default InputTextField;
