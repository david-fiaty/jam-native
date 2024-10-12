import { StyleSheet, View, TextInput } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  placeholder?: string,
  style?: object,
};

const TextField = ({placeholder, style}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.field, style]}
        placeholder={placeholder}
        placeholderTextColor={GlobalStyles.text.color}
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

export default TextField;