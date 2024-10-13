import { StyleSheet, View, Text } from 'react-native';
import ModalView from '@/components/base/ModalView';
import ClearIcon from '../icons/ClearIcon';

const SearchMenu = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Search" 
        animation="slide"
        label={
          <ClearIcon name="search" />
        }
        content={
          <Text>SEARCH</Text>
        }
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
