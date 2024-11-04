import { StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import BoxView from '../view/BoxView';
import { Layout } from '@/constants/Layout';

type Props = BaseProps & {
  value?: string,
  placeholder?: string,
  containerStyle?: object,
  disabled?: boolean, 
};

const InputTextareaField = ({value, placeholder, containerStyle, disabled}: Props) => {
  return (
    <BoxView style={styles.container}>
      <Input
        style={styles.element}
        containerStyle={[Layout.formField, styles.element]}
        placeholder={placeholder}
        placeholderTextColor={Colors.primary}
        multiline={true}
        textAlignVertical="top"
        numberOfLines={10}
        editable={!disabled}
        value={value}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  element: {
    paddingTop: Layout.space.base/2,
    height: Layout.space.base*8,
  },
});

export default InputTextareaField;