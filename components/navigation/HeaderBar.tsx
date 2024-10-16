import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import JamLogo from '@/components/images/JamLogo';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SearchScreen from '../screens/SearchScreen';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';

const HeaderBar = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => router.replace('/jams')}>
          <JamLogo width={46} height={46} /> 
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
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
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray', 
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight,
    padding: GlobalStyles.space,
  },
  left: {
    gap: GlobalStyles.space,
  },
  right: {
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

export default HeaderBar;
