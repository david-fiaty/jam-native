import { StyleSheet, View, Text } from 'react-native';
import ModalView from '@/components/base/ModalView';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ClearIcon from '../icons/ClearIcon';

const SearchMenu = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Search" 
        label={
          <ClearIcon name="search" />
        }
        content={
          <Text>SEARCH</Text>
        }
        animation="slide"
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  list: {
    width: '100%',
  },
});

export default SearchMenu;
