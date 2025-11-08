import React, { useState, useEffect, JSX } from "react";
import { StyleSheet, TextInput, View } from "react-native";
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
  rightIcon?: JSX.Element;
  disabled?: boolean;
  secureTextEntry?: boolean;
  spellCheck?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
  numberOfLines?: any;
  textAlignVertical?: any;
  trim?: boolean;
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
  rightIcon,
  disabled,
  secureTextEntry,
  spellCheck,
  readOnly,
  multiline,
  numberOfLines,
  textAlignVertical,
  trim,
  onChangeText,
  onSubmitEditing,
}: Props) => {
  const [currentValue, setCurrentValue] = useState<any>('');

  if (theme == 'white') {
    containerStyle = {
      ...(containerStyle || {}),
      ...styles.containerStyle,
      ...styles.containerStyleWhite,
      ...{ paddingRight: (rightIcon ? Layout.space.base*3.5 : Layout.space.base) }
    };
  }

  textAlignVertical = textAlignVertical ? textAlignVertical : 'top';

  const disabledStyle: any = {
    opacity: disabled ? 0.4 : 1,
  };

  const changeTextEvent = (fieldValue: any) => {
    if (trim === true) {
      fieldValue = (fieldValue || '').trim();
    }

    setCurrentValue(fieldValue);

    if (onChangeText) {
      onChangeText(fieldValue)
    }
    else {
      FormManager.updateField(resource, fieldKey, fieldValue, rules, parentKey);
    }
  };

  const submitEditingEvent = () => {
    let fieldValue: any = currentValue;

    if (trim === true) {
      fieldValue = (fieldValue || '').trim();
    }

    if (onSubmitEditing) {
      onSubmitEditing();
    }
    else if (onChangeText) {
      onChangeText(fieldValue);
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
        align="center"
        justify="flex-start"
        style={[styles.container, disabledStyle]}
      >
        <TextInput
          keyboardType={keyboardType}
          textAlignVertical={textAlignVertical}
          numberOfLines={numberOfLines}
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

        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </BoxView>

      {!!rules?.length && FormManager.renderError(fieldKey, parentKey)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  containerStyle: {
    paddingLeft: Layout.space.base,
    color: Layout.colors.primary,
    width: '100%',
  },
  containerStyleWhite: {
    backgroundColor: Layout.colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Layout.colors.primary,
    width: '100%',
  },
  rightIcon: {
    position: 'absolute',
    right: Layout.space.base,
  },
});

export default InputTextField;
