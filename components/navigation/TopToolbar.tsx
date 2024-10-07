import { View, StyleSheet, Text } from 'react-native';
import { StaticImage } from '@/components/StaticImage';
import SettingsMenu from '../menus/SettingsMenu';
import NotificationsMenu from '../menus/NotificationsMenu';
import SearchIcon from '../icons/SearchIcon';

const TopToolbar = () => {
  return (
    <View style={styles.container}>
      <StaticImage uri={require('@/assets/images/jam-logo.png')} width={45} height={45} /> 
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
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});

export default TopToolbar;