import { StyleSheet, View, FlatList } from 'react-native';
import ModalView from '@/components/base/ModalView';
import TertiaryIcon from '../icons/TertiaryIcon';
import AccountScreen from './AccountScreen';
import PasswordScreen from './PasswordScreen';
import LanguageScreen from './LanguageScreen';

const data = [
  {
    'label': 'Account information',
    'path': '/account',
    'screen': () => <AccountScreen />,
  },
  {
    'label': 'Change password',
    'path': '/password',
    'screen': PasswordScreen,
  },
  {
    'label': 'Language',
    'path': '/language',
    'screen': LanguageScreen,
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
                <View>
                {item.screen()}
                </View>
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
