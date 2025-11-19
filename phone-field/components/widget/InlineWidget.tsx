import { Text } from "react-native";
import InputTextElement from "../element/InputTextElement";
import { PhoneFieldProps } from "@/phone-field/types/field";

interface InlineWidgetProps extends PhoneFieldProps {

}

const InlineWidget = (props: InlineWidgetProps) => {
  return (
    <>
      <Text>Inline phone widget</Text>
      <InputTextElement {...props} />
    </>
  );
};

export default InlineWidget;