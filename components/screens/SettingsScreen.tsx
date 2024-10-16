import { StyleSheet, View, FlatList } from 'react-native';
import ModalView from '@/components/base/ModalView';
import TertiaryIcon from '../icons/TertiaryIcon';
import AccountScreen from './AccountScreen';

const data = [
  {
    'label': 'Account information',
    'path': '/account',
    'component': '',
  },
  {
    'label': 'Change password',
    'path': '/password',
    'component': '',
  },
  {
    'label': 'Language',
    'path': '/language',
    'component': '',
  },
];

const SettingsScreen = () => {
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
