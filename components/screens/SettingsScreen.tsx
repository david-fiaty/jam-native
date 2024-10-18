import { StyleSheet, View, FlatList } from 'react-native';
import ModalView from '@/components/base/ModalView';
import TertiaryIcon from '../icons/TertiaryIcon';
import AccountScreen from './AccountScreen';
import PasswordScreen from './PasswordScreen';
import LanguageScreen from './LanguageScreen';

type ItemProps = {
  item: object,
};

const data = [
  {
    'label': 'Account information',
    'path': '/account',
    'screen': ({item} : ItemProps) => <AccountScreen menuItem={item}/>,
  },
  {
    'label': 'Change password',
    'path': '/password',
    'screen': ({item} : ItemProps) => <PasswordScreen menuItem={item}/>,
  },
  {
    'label': 'Language',
    'path': '/language',
    'screen': ({item} : ItemProps) => <LanguageScreen menuItem={item}/>,
  },
];

const SettingsScreen = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Settings" 
        animation="slide"
        showBackButton={true}
        label={<TertiaryIcon name="menu" />}
        content={
          <FlatList 
            data={data} 
            horizontal={false}  
            style={styles.list}
            renderItem={({item, index}) => {
              return (
                <View>{item.screen({item})}</View>
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
