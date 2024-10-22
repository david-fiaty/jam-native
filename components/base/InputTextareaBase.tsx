import { StyleSheet, TextInput } from 'react-native';
import { Input } from '@rneui/themed';
import { BaseProps } from '@/constants/Types';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import BoxView from '../view/BoxView';

type Props = BaseProps & {
  value?: string,
  placeholder?: string,
  containerStyle?: object,
};

const InputTextareaBase = ({value, placeholder, containerStyle}: Props) => {
  return (
    <BoxView style={[styles.container, containerStyle]}>
      <Input
        style={styles.element}
        placeholder={placeholder}
        placeholderTextColor={Colors.primary}
        multiline={true}
        textAlignVertical="top"
        numberOfLines={5}
        value={value}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  element: {},
});

export default InputTextareaBase;