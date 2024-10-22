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