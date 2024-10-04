import { StyleSheet, View } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';

const SettingsMenu = () => {
  return (
    <View style={styles.container}>        
      <SimpleLineIcons name="menu" size={24} color={GlobalStyles.icon.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
  },
});

export default SettingsMenu;