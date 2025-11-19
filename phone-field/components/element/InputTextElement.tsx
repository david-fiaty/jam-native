import { Text } from "react-native";
import { TextInput, TextInputProps } from "react-native";

interface InputTextElementProps extends TextInputProps {

}

const InputTextElement = (props: InputTextElementProps) => {
  return (
    <TextInput {...props} /> 
  );
};

export default InputTextElement;