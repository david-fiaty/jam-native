import { StyleSheet, View, TextInput } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  placeholder?: string,
  style?: object,
};

const SelectListField = ({placeholder, style}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.field, style]}
        placeholder={placeholder}
        placeholderTextColor={GlobalStyles.text.color}
        multiline={true}
        textAlignVertical="top"
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
  field: {
    ...GlobalStyles.field,
    ...{
      paddingTop: GlobalStyles.space,
      height: GlobalStyles.space*10,
    },
  },
});

export default SelectListField;