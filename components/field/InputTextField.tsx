import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Input } from "@rneui/themed";
import { BaseProps } from "@/constants/Types";
import { Colors } from "@/constants/Colors";
import BoxView from "../view/BoxView";

type Props = BaseProps & {
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
  onBlur?: () => void;
};

const InputTextField = ({
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
  onBlur,
}: Props) => {
  const [currentValue, setCurrentValue] = useState<any>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const disabledStyle: any = {
    opacity: disabled ? 0.4: 1,
  }

  useEffect(() => {
    if (!isLoaded) {
      setCurrentValue(value);
      setIsLoaded(true);
    }
  }, [isLoaded, value]);

  return (
    <BoxView style={[styles.container, disabledStyle]}>
      <Input
        textAlignVertical="center"
        numberOfLines={1}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        placeholder={placeholder}
        placeholderTextColor={Colors.primary}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={containerStyle ?? {}}
        multiline={false}
        editable={!disabled}
        secureTextEntry={secureTextEntry}
        spellCheck={spellCheck}
        value={value}
        readOnly={readOnly}
        onChangeText={(value: any) => {
          if (onChangeText) onChangeText(value)
          else setCurrentValue(value);
        }}
        onSubmitEditing={() => {
          if (onSubmitEditing) onSubmitEditing()
          else if (onChangeText) onChangeText(currentValue);
        }}
        onBlur={() => {
          if (onBlur) onBlur()
          else if (onChangeText) onChangeText(currentValue);
        }}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainerStyle: {
    width: '100%',
  },
});

export default InputTextField;
