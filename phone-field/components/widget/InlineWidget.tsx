import { Text } from "react-native";
import InputTextElement from "../element/InputTextElement";
import { PhoneFieldProps } from "@/phone-field/types/field";


const InlineWidget = (props: PhoneFieldProps) => {
  return (
    <>
      <Text>Inline phone widget</Text>
      <InputTextElement {...props} />
    </>
  );
};

export default InlineWidget;