import { Text } from "react-native";
import InlinePhoneField from "./InlinePhoneField";
import SplitPhoneField from "./SplitPhoneField";

interface PhoneFieldProps {
  mode?: 'inline' | 'split';
  value?: string;
  onChange?: (data: any) => void;
}

const PhoneField = ({ mode, value, onChange }: PhoneFieldProps) => {
  mode = mode || 'inline';

  if (mode == 'inline') {
    return (
      <InlinePhoneField />
    );
  }
  else if (mode == 'split') {
    return (
      <SplitPhoneField />
    );
  }
};

export default PhoneField;