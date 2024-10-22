import { StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from '@rneui/themed';

type Props = {
  label: JSX.Element,
  title?: string,
  data?: object,
};

const CheckboxSelectBase = ({label, title, data}: Props) => {
  console.log(data);

  return (
    <TouchableOpacity>
      {label}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CheckboxSelectBase;