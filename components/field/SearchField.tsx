import { StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';

const SearchField = () => {
  return (
    <BoxView direction="row" align="space-between" style={styles.container}>
      <Input 
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        rightIcon={<IconView name="search" theme="clear" onPress={() => {/*dispatch(setActiveScreen('SearchView')) */}} />}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    flexGrow: 1,
  },
  inputStyle: {
    borderBottomWidth: 0,
    flexGrow: 1,
  },
});

export default SearchField;