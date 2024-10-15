import { StyleSheet, View, TextInput } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  placeholder?: string,
  style?: object,
  editable?: boolean
};

const InputTextField = ({placeholder, style, editable}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.field, style]}
        placeholder={placeholder}
        placeholderTextColor={GlobalStyles.text.color}
        editable={editable === false ? false : true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  field: GlobalStyles.field,
});

export default InputTextField;