import { Text, StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { InputTextElementProps } from "@/phone-field/types/element";

const InputTextElement = (props: InputTextElementProps) => {
  return (
    <TextInput {...props} /> 
  );
};

const styles = StyleSheet.create({

});

export default InputTextElement;