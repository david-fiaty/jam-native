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
    <BoxView style={styles.container}>
      <TextInput
        style={styles.element}
        placeholder={placeholder}
        placeholderTextColor={GlobalStyles.text.color}
        multiline={true}
        textAlignVertical="top"
        numberOfLines={5}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  element: {
    backgroundColor: Colors.secondary,
    width: '100%',
    borderWidth: 1, 
    borderColor: Colors.secondary, 
    borderRadius: Layout.radius.round,
    paddingHorizontal: Layout.space.base, 
    justifyContent: 'center',
  },
});

export default TextareaField;