import { StyleSheet, TextInput } from 'react-native';
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
    <BoxView style={[styles.container, containerStyle]}>
      <TextInput
        style={styles.element}
        placeholder={placeholder}
        placeholderTextColor={Colors.primary}
        multiline={true}
        textAlignVertical="center"
        numberOfLines={1}
        value={value}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {},
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

export default InputTextBase;