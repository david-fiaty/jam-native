import { View, StyleSheet } from 'react-native';
import { SvgImage } from '@/components/SvgImage';
import SettingsMenu from '../menus/SettingsMenu';

const TopToolbar = () => {
  return (
    <View style={styles.container}>
      <SvgImage uri={require('@/assets/images/jam-logo.png')} width={45} height={45} />  
      <SettingsMenu />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'black'
  },
});

export default TopToolbar;