import { View, StyleSheet } from 'react-native';
import JamLogo from '@/components/images/JamLogo';
import SettingsMenu from '../menus/SettingsMenu';
import NotificationsMenu from '../menus/NotificationsMenu';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import SearchMenu from '../menus/SearchMenu';
import PrimaryIcon from '../icons/PrimaryIcon';
import SecondaryIcon from '../icons/SecondaryIcon';
import TertiaryIcon from '../icons/TertiaryIcon';

const TopToolbar = () => {
  return (
    <View style={styles.container}>
      <JamLogo width={46} height={46} /> 
      <View style={styles.buttons}> 
        <PrimaryIcon name="plus" />
        <SecondaryIcon name="plus" />
        <TertiaryIcon name="plus" />
        <SettingsMenu />  
        <NotificationsMenu />
        <SearchMenu />
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
    marginBottom: GlobalStyles.space*2,
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
