import { View, StyleSheet } from 'react-native';
import JamLogo from '@/components/images/JamLogo';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import SearchScreen from '../screens/SearchScreen';

const TopToolbar = () => {
  return (
    <View style={styles.container}>
      <JamLogo width={46} height={46} /> 
      <View style={styles.buttons}> 
        <SettingsScreen />  
        <NotificationsScreen />
        <SearchScreen />
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
