import React, { useState, useEffect, JSX } from "react";
import { TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import IconView from "../view/IconView";
import FormManager from "@/manager/FormManager";
import InputTextField from "./InputTextField";

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
  theme,
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
  disabled,
  readOnly,
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const renderRightIcon = () => {
    let iconName: string = isVisible ? 'blind' : 'see';

    return (
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <IconView name={iconName} theme="transparent" />
      </TouchableOpacity>
    );
  };

  return (
    <InputTextField
      theme={theme}
      resource={resource}
      fieldKey={fieldKey}
      parentKey={parentKey}
      rules={rules}
      label={label}
      value={value}
      placeholder={placeholder}
      secureTextEntry={!isVisible}
      spellCheck={false}
      rightIcon={renderRightIcon()}
      containerStyle={containerStyle}
      keyboardType={keyboardType}
      inputStyle={inputStyle}
      inputContainerStyle={inputContainerStyle}
      leftIcon={leftIcon}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};

export default InputPasswordField;
