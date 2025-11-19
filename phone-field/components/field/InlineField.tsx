import InputTextElement from "../element/InputTextElement";
import { InlineFieldProps } from "@/phone-field/types/field";
import { Text } from "react-native";

const InlineField = (props: InlineFieldProps) => {
  return (
    <>
      <Text>Inline phone widget</Text>
      <InputTextElement {...props} />
    </>
  );
};

export default InlineField;