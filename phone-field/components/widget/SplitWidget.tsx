import { Text } from "react-native";
import { PhoneFieldProps } from "@/phone-field/types/field";

interface SplitWidgetProps extends PhoneFieldProps {

}

const SplitWidget = ( props: SplitWidgetProps ) => {
  return (
    <Text>Split phone widget</Text>
  );
};

export default SplitWidget;