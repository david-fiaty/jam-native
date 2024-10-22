import { StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import BoxView from '../view/BoxView';

type Props = BaseProps & {
  value?: string,
  placeholder?: string,
  containerStyle?: object,
  leftIcon?: JSX.Element,
  rightIcon?: JSX.Element,
  disabled?: boolean, 
};

const InputTextBase = ({value, placeholder, containerStyle, leftIcon, rightIcon, disabled}: Props) => {
  return (
    <BoxView style={[styles.container, containerStyle]}>
      <Input
        textAlignVertical="center"
        numberOfLines={1}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        style={styles.element}
        placeholder={placeholder}
        placeholderTextColor={Colors.primary}
        multiline={false}
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
  element: {},
});

export default InputTextBase;