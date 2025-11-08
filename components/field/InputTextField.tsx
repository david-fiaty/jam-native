import React, { useState, useEffect, JSX } from "react";
import { StyleSheet, TextInput } from "react-native";
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
  containerStyle?: object;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  disabled?: boolean;
  secureTextEntry?: boolean;
  spellCheck?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
  numberOfLines?: any;
  textAlignVertical?: any;
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
  leftIcon,
  rightIcon,
  disabled,
  secureTextEntry,
  spellCheck,
  readOnly,
  multiline,
  numberOfLines,
  textAlignVertical,
  onChangeText,
  onSubmitEditing,
}: Props) => {
  const [currentValue, setCurrentValue] = useState<any>('');

  if (theme == 'white') {
    containerStyle = {
      ...(containerStyle || {}),
      ...styles.containerStyle,
      ...styles.containerStyleWhite,
    };
  }

  textAlignVertical = textAlignVertical ? textAlignVertical : 'top';

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

      <TextInput
        keyboardType={keyboardType}
        textAlignVertical={textAlignVertical}
        numberOfLines={numberOfLines}
        //leftIcon={leftIcon}
        //rightIcon={rightIcon}
        placeholder={placeholder}
        placeholderTextColor={Layout.colors.primary}      
        style={[Layout.formField, styles.containerStyle, containerStyle || {}]}
        multiline={multiline}
        editable={!disabled}
        secureTextEntry={secureTextEntry}
        spellCheck={spellCheck}
        value={currentValue}
        readOnly={readOnly}
        onChangeText={changeTextEvent}
        onSubmitEditing={submitEditingEvent}
      />

      {!!rules?.length && FormManager.renderError(fieldKey, parentKey)}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  containerStyle: {
    paddingLeft: Layout.space.base,
    color: Layout.colors.primary,
  },
  containerStyleWhite: {
    backgroundColor: Layout.colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Layout.colors.primary,
  },
});

export default InputTextField;
