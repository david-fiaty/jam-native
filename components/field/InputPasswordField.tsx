import React, { useState, useEffect, JSX } from "react";
import { TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import IconView from "../view/IconView";
import FormManager from "@/manager/FormManager";
import InputTextField from "./InputTextField";

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  keyboardType?: any;
  label?: any;
  value?: string;
  placeholder?: string;
  containerStyle?: object;
  inputStyle?: any;
  inputContainerStyle?: any;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  disabled?: boolean;
  secureTextEntry?: boolean;
  spellCheck?: boolean;
  readOnly?: boolean;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: () => void;
};

const InputPasswordField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  keyboardType,
  label,
  value,
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
  const [isVisible, setIsVisible] = useState<boolean>(false);

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

  const renderRightIcon = () => {
    let iconName: string = isVisible ? 'blind' : 'see';

    return (
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <IconView name={iconName} theme="transparent" />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <InputTextField
      resource={resource}
      fieldKey={fieldKey}
      rules={rules}
      label={label}
      placeholder={placeholder}
      secureTextEntry={!isVisible}
      spellCheck={false}
      rightIcon={renderRightIcon()}
      containerStyle={containerStyle}
    />
  );
};

export default InputPasswordField;
