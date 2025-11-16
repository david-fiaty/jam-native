import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import InputTextField from "./InputTextField";

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: string;
  label?: string;
  placeholder?: string;
  containerStyle?: object;
  disabled?: boolean;
  readOnly?: boolean;
  numerOfLines?: any;
  onSubmitEditing?: () => void;
  onChangeText?: (value: any) => void;
};

const InputTextareaField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  value,
  label,
  placeholder,
  containerStyle,
  disabled,
  readOnly,
  numerOfLines,
  onChangeText,
  onSubmitEditing,
}: Props) => {

  numerOfLines = numerOfLines || 10;

  containerStyle = {
    ...(containerStyle || {}),
    ...{
      height: numerOfLines*Layout.space.base,
    }
  }

  return (
    <InputTextField
      resource={resource}
      fieldKey={fieldKey}
      parentKey={parentKey}
      value={value}
      rules={rules}
      label={label}
      placeholder={placeholder}
      multiline={true}
      textAlignVertical="top"
      numberOfLines={numerOfLines}
      disabled={disabled}
      readOnly={readOnly}
      containerStyle={[Layout.formField, styles.element, containerStyle]}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  );
};

const styles = StyleSheet.create({
  element: {
    width: '100%',
    paddingTop: Layout.space.base / 2,
    height: 'auto',
  },
});

export default InputTextareaField;