import { StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import { Layout } from '@/constants/Layout';
import BoxView from '../view/BoxView';

type Props = {
  value?: string;
  placeholder?: string;
  containerStyle?: object;
  disabled?: boolean; 
  readOnly?: boolean;
  onChangeText?: (value: any) => void;
};

const InputTextareaField = ({value, placeholder, containerStyle, disabled, readOnly, onChangeText}: Props) => {
  return (
    <BoxView style={styles.container}>
      <Input
        style={styles.element}
        containerStyle={[Layout.formField, styles.element]}
        placeholder={placeholder}
        placeholderTextColor={Layout.colors.primary}
        multiline={true}
        textAlignVertical="top"
        numberOfLines={10}
        editable={!disabled}
        value={value}
        onChangeText={onChangeText}
        readOnly={readOnly}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  element: {
    width: '100%',
    paddingTop: Layout.space.base/2,
    height: Layout.space.base*12,
  },
});

export default InputTextareaField;