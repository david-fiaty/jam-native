import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import JamLogo from '@/components/images/JamLogo';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SearchScreen from '../screens/SearchScreen';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import TextBlock from '../base/TextBlock';

const HeaderBar = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => router.replace('/main')}>
          <JamLogo width={46} height={46} /> 
        </TouchableOpacity>
      </View>
      
      <View style={styles.right}>
        <TextBlock>X</TextBlock>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: GlobalStyles.space.container,
  },
  left: {
    gap: GlobalStyles.space.base,
  },
  right: {
    flexDirection: 'row',
    gap: GlobalStyles.space.base,
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
