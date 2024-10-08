import { StyleSheet, View, FlatList } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MenuItem from './MenuItem';
import ModalView from '../ModalView';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import SettingsMenuItems from '@/constants/SettingsMenuItems';

const SettingsMenu = () => {
  const data = SettingsMenuItems;

  return (
    <View style={styles.container}>        
      <ModalView 
        title="Settings" 
        label={<SimpleLineIcons name="menu" size={12} style={styles.icon} />}
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
  icon: {
    ...GlobalStyles.icon,
    ...{
      backgroundColor: Colors.tertiary,
      padding: 8,
      borderRadius: 40,
    },
  },
});

export default SettingsMenu;