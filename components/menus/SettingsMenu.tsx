import { StyleSheet, View } from 'react-native';
import { MenuView } from '@react-native-menu/menu';
import MenuIcon from '@/icons/MenuIcon';

const SettingsMenu = () => {
  return (
    <View style={styles.container}>        
      <MenuIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default SettingsMenu;