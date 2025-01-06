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
  autoCapitalize?: boolean;
  spellCheck?: boolean;
  readOnly?: boolean,
  onChangeText?: (value: string) => void;
  onSubmitEditing?: () => void;
};

const InputTextField = ({
  value,
  placeholder,
  containerStyle,
  leftIcon,
  rightIcon,
  disabled,
  secureTextEntry,
  autoCapitalize,
  spellCheck,
  readOnly,
  onChangeText,
  onSubmitEditing,
}: Props) => {
  return (
    <BoxView style={styles.container}>
      <Input
        textAlignVertical="center"
        numberOfLines={1}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        placeholder={placeholder}
        placeholderTextColor={Colors.primary}
        containerStyle={containerStyle ?? {}}
        multiline={false}
        editable={!disabled}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        spellCheck={spellCheck}
        value={value}
        readOnly={readOnly}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default InputTextField;
