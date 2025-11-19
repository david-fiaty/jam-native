import InlinePhoneField from "./InlinePhoneField";
import SplitPhoneField from "./SplitPhoneField";

interface PhoneFieldProps {
  id?: any;
  ref?: any;
  mode?: 'inline' | 'split';
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  rules?: any[];
  onChange?: (data: any) => void;
  onValidate?: (data: any) => void;
}

const PhoneField = ({ id, ref, mode, value, placeholder, disabled, rules, onChange, onValidate }: PhoneFieldProps) => {
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