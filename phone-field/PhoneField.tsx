import InlinePhoneField from "./InlinePhoneField";
import SplitPhoneField from "./SplitPhoneField";

interface PhoneFieldProps {
  mode?: 'inline' | 'split';
  value?: string;
  rules?: any[];
  onChange?: (data: any) => void;
  onValidate?: (data: any) => void;
}

const PhoneField = ({ mode, value, rules, onChange, onValidate }: PhoneFieldProps) => {
  mode = mode || 'inline';
  value = value || '';

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