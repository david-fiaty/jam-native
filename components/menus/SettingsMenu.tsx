import { StyleSheet, View, FlatList } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MenuItem from './MenuItem';
import ModalView from '../ModalView';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

const SettingsMenu = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        label={<SimpleLineIcons name="menu" size={12} style={styles.icon} />}
        title="Settings" 
        menu={true}
        content={
          <FlatList 
            data={data} 
            horizontal={false}  
            style={styles.list}
            renderItem={({item, index}) => <MenuItem item={item} index={index} />} 
          />
        }
        animation="fade"
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
      backgroundColor: Colors.tertiary,
      padding: 8,
      borderRadius: 40,
    },
  },
});

const data = [
  {
    'label': 'Account information',
    'path': '/jams',
  },
  {
    'label': 'Change password',
    'path': '/jams',
  },
  {
    'label': 'Change user name',
    'path': '/jams',
  },
  {
    'label': 'Delete account',
    'path': '/jams',
  },
];

export default SettingsMenu;