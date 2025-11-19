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
  modalSelection: boolean;
  containerStyle?: any;
  onChangeValue?: (data: any) => void;
  onValidateValue?: (data: any) => void;
}

const PhoneField = ( props: PhoneFieldProps ) => {
  const mode: string = props?.mode || 'inline';

  if (mode == 'inline') {
    return (
      <InlinePhoneField {...props} />
    );
  }
  else if (mode == 'split') {
    return (
      <SplitPhoneField {...props} />
    );
  }
};

export default PhoneField;