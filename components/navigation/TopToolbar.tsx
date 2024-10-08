import { View, StyleSheet, Text } from 'react-native';
import { StaticImage } from '@/components/StaticImage';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import SettingsMenu from '../menus/SettingsMenu';
import NotificationsMenu from '../menus/NotificationsMenu';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';


const TopToolbar = () => {
  return (
    <View style={styles.container}>
      <StaticImage uri={require('@/assets/images/jam-logo.png')} width={40} height={42} /> 
      <View style={styles.buttons}> 
        <SettingsMenu />  
        <NotificationsMenu />
        <SimpleLineIcons name="magnifier" size={14} color={GlobalStyles.icon.color} />
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