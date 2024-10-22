import { StyleSheet, View, TextInput } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { BaseProps } from '@/constants/Types';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import BoxView from '../view/BoxView';

type Props = BaseProps & {
  placeholder?: string,
};

const TextareaField = ({placeholder}: Props) => {
  return (
    <BoxView>
      <TextInput
        style={styles.element}
        placeholder={placeholder}
        placeholderTextColor={GlobalStyles.text.color}
        multiline={true}
        textAlignVertical="top"
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  element: Layout.formField,
});

export default TextareaField;