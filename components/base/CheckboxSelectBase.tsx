import { StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from '@rneui/themed';
import ModalView from '../view/ModalView';

type Props = {
  label: JSX.Element,
  title?: string,
  data?: object,
};

const CheckboxSelectBase = ({label, title, data}: Props) => {
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