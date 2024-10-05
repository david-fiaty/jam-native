import { View, StyleSheet } from 'react-native';
import { SvgImage } from '@/components/SvgImage';
import SettingsMenu from '../menus/SettingsMenu';
import NotificationsMenu from '../menus/NotificationsMenu';
import SearchIcon from '../icons/SearchIcon';

const TopToolbar = () => {
  return (
    <View style={styles.container}>
      <SvgImage uri={require('@/assets/images/jam-logo.png')} width={45} height={45} /> 
      <View style={styles.buttons}> 
        <SettingsMenu />  
        <NotificationsMenu />
        <SearchIcon />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'black',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default TopToolbar;