import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { CheckBox } from '@rneui/themed';
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import IconView from "../view/IconView";

type Props = {
  label: string,
  title?: string,
  data?: object,
};

const CheckboxSelectBase = ({label, title, data}: Props) => {
  return (
    <BoxView direction="row" align="center" style={styles.container}>
      <IconView name="plus" theme="secondary" size={22} radius="round" />
      <TextView>{label}</TextView>
    </BoxView>
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