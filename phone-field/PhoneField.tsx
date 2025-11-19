import InlinePhoneField from "./InlinePhoneField";
import SplitPhoneField from "./SplitPhoneField";

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
  onChangeValue?: (data: any) => void;
  onValidateValue?: (data: any) => void;
}

const PhoneField = ({ 
  id, 
  ref, 
  mode, 
  value, 
  defaultValue, 
  defaultCountry,
  placeholder, 
  disabled, 
  rules, 
  formatValue,
  showFlags,
  onChangeValue, 
  onValidateValue
}: PhoneFieldProps) => {
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