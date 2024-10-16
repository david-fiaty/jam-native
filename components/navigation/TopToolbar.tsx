import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import JamLogo from '@/components/images/JamLogo';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SearchScreen from '../screens/SearchScreen';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';

const TopToolbar = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/jams')}>
        <JamLogo width={46} height={46} /> 
      </TouchableOpacity>
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
    backgroundColor: 'red',
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
