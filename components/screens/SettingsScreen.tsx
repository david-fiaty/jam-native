import { StyleSheet, View, FlatList } from 'react-native';
import ModalView from '@/components/base/ModalView';
import SettingsScreenItems from '@/constants/SettingsScreenItems';
import TertiaryIcon from '../icons/TertiaryIcon';
import AccountScreen from './AccountScreen';

const SettingsScreen = () => {
  const data = SettingsScreenItems;

  return (
    <View style={styles.container}>        
      <ModalView 
        title="Settings" 
        animation="slide"
        label={<TertiaryIcon name="menu" />}
        content={
          <FlatList 
            data={data} 
            horizontal={false}  
            style={styles.list}
            renderItem={({item, index}) => {
              return (
                <AccountScreen menuItem={item}/>
              );
            }} 
          />
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

export default SettingsScreen;
