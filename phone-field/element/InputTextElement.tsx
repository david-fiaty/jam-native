import { Text } from "react-native";
import { TextInput, TextInputProps } from "react-native";

interface InputTextElementProps extends TextInputProps {

}

const InputTextElement = (props: InputTextElementProps) => {
  return (
    <Text>Input text element</Text>
  );
};

export default InputTextElement;