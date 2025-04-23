import React, { useState } from "react";
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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const disabledStyle: any = {
    opacity: disabled ? 0.4: 1,
  }

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
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onBlur={onBlur}
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
