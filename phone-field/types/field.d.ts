export interface PhoneFieldProps {
  id?: any;
  ref?: any;
  layout?: 'inline' | 'split';
  value?: any;
  defaultValue?: any;
  defaultCountry?: any;
  placeholder?: string;
  disabled?: boolean;
  rules?: any[];
  formatValue?: boolean;
  showFlags?: boolean;
  modalSelection?: boolean;
  searchEnabled?: boolean;
  containerStyle?: any;
  onChangeValue?: (data: any) => void;
  onValidateValue?: (data: any) => void;
}

export interface InlineFieldProps extends PhoneFieldProps {

}

export interface SplitFieldProps extends PhoneFieldProps {

}