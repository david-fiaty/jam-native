import { StyleSheet, View, FlatList, Text } from 'react-native';
import ModalView from '@/components/base/ModalView';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import StaticIcon from '../base/StaticIcon';

const SearchMenu = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Search" 
        label={
          <StaticIcon 
            name="search" 
            iconStyle={GlobalStyles.tabs.icon} 
            containerStyle={[GlobalStyles.icon.clear, styles.icon]}
            size={styles.icon.size} 
          />
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
  icon: {
    ...GlobalStyles.icon,
    ...{
      backgroundColor: Colors.secondary,
      padding: GlobalStyles.space/1.5,
      borderRadius: 40,
      size: GlobalStyles.tabs.icon.size/1.5,
    },
  },
});

export default SearchMenu;