import { StyleSheet, View, Text } from 'react-native';
import ModalView from '@/components/base/ModalView';
import ClearIcon from '../icons/ClearIcon';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TestScreen from '../TestScreen';

const SearchScreen = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Search" 
        animation="slide"
        label={<ClearIcon name="search" size={styles.icon.size} />}
        content={
          <TestScreen />
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
    size: GlobalStyles.space.base*2,
  },
});

export default SearchScreen;
