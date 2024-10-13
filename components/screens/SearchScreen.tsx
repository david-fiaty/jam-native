import { StyleSheet, View, Text } from 'react-native';
import ModalView from '@/components/base/ModalView';
import ClearIcon from '../icons/ClearIcon';
import { GlobalStyles } from '@/constants/GlobalStyles';

const SearchScreen = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Search" 
        animation="slide"
        label={<ClearIcon name="search" size={styles.icon.size} />}
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
  icon: {
    size: GlobalStyles.space*2,
  },
});

export default SearchScreen;
