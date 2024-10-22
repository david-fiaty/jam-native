import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { CheckBox } from '@rneui/themed';
import TextView from '../view/TextView';
//import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
//import ScrollContainer from '../base/ScrollContainer';

type Props = {
  label?: JSX.Element,
  title?: JSX.Element,
  data?: object,
};

const CheckboxSelectBase = ({label, title, data}: Props) => {
  return (
    <TextView>Checkboxes</TextView>
  );
};

const styles = StyleSheet.create({
  /*
  list: {
    width: '100%',
    marginTop: GlobalStyles.space.base*2,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: GlobalStyles.space.base,
    padding: GlobalStyles.space.base,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: GlobalStyles.space.base,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: GlobalStyles.space.base,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  scroll: {
    flexGrow: 1,
  },  
  checkbox: {
    padding: 0,
    margin: 0,
  },
  */
});

export default CheckboxSelectBase;