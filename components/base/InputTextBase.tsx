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

const InputTextBase = ({value, placeholder, containerStyle}: Props) => {
  return (
    <>
    <Input />
    <BoxView style={[styles.container, containerStyle]}>
      <Input
        style={styles.element}
        placeholder={placeholder}
        placeholderTextColor={Colors.primary}
        multiline={false}
        textAlignVertical="center"
        numberOfLines={1}
        value={value}
      />
    </BoxView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  element: {},
});

export default InputTextBase;