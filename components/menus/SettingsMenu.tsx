import { StyleSheet, View, FlatList } from 'react-native';
import MenuItem from '@/components/menus/MenuItem';
import ModalView from '@/components/base/ModalView';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import SettingsMenuItems from '@/constants/SettingsMenuItems';
import TertiaryIcon from '../icons/TertiaryIcon';

const SettingsMenu = () => {
  const data = SettingsMenuItems;

  return (
    <View style={styles.container}>        
      <ModalView 
        title="Settings" 
        animation="slide"
        label={
          <TertiaryIcon name="menu" />
        }
        content={
          <FlatList 
            data={data} 
            horizontal={false}  
            style={styles.list}
            renderItem={({item, index}) => <MenuItem item={item} index={index} />} 
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

export default SettingsMenu;
