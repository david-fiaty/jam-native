import { StyleSheet, View, FlatList } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MenuItem from './MenuItem';
import ModalWindow from '../ModalWindow';
import { GlobalStyles } from '@/constants/GlobalStyles';

const SettingsMenu = () => {
  return (
    <View style={styles.container}>        
      <ModalWindow 
        label={<SimpleLineIcons name="menu" size={14} color={GlobalStyles.icon.color} />}
        title="Settings" 
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