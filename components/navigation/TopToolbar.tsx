import { View, StyleSheet } from 'react-native';
import JamLogo from '@/components/images/JamLogo';
import SettingsMenu from '../menus/SettingsMenu';
import NotificationsMenu from '../menus/NotificationsMenu';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import SearchIcon from '../icons/SearchIcon';

const TopToolbar = () => {
  return (
    <View style={styles.container}>
      <JamLogo width={46} height={46} /> 
      <View style={styles.buttons}> 
        <SettingsMenu />  
        <NotificationsMenu />
        <SearchIcon size={14} />
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
    backgroundColor: 'red',
    //marginBottom: 20,
    height: GlobalStyles.toolbar.height,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: GlobalStyles.space,
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

export default TopToolbar;