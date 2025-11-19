import InlineWidget from "./widget/InlineWidget";
import SplitWidget from "./widget/SplitWidget";

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
  searchEnabled: boolean;
  containerStyle?: any;
  onChangeValue?: (data: any) => void;
  onValidateValue?: (data: any) => void;
}

const PhoneField = ( props: PhoneFieldProps ) => {
  const mode: string = props?.mode || 'inline';

  if (mode == 'inline') {
    return (
      <InlineWidget {...props} />
    );
  }
  else if (mode == 'split') {
    return (
      <SplitWidget {...props} />
    );
  }
};

export default PhoneField;