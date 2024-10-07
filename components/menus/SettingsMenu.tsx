import { StyleSheet, View, FlatList } from 'react-native';
import MenuIcon from '../icons/MenuIcon';
import MenuItem from './MenuItem';
import ModalWindow from '../ModalWindow';

const SettingsMenu = () => {
  return (
    <View style={styles.container}>        
      <ModalWindow 
        label={<MenuIcon />}
        title="Settings" 
        content={
          <FlatList 
            data={data} 
            horizontal={false}  
            style={styles.list}
            renderItem={({item, index}) => <MenuItem item={item} index={index} />} 
          />
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