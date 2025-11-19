import { Text } from "react-native";

interface PhoneFieldProps {
  id?: any;
  ref?: any;
  mode?: 'inline' | 'split';
  value?: any;
  defaultValue?: any;
  defaultCountry?: any;
  placeholder?: string;
  disabled?: boolean;
  rules?: any[];
  formatValue?: boolean;
  showFlags?: boolean;
  modalSelection: boolean;
  containerStyle?: any;
  onChangeValue?: (data: any) => void;
  onValidateValue?: (data: any) => void;
}

const InlineWidget = ( props: PhoneFieldProps) => {
  return (
    <Text>Inline phone field</Text>
  );
};

export default InlineWidget;