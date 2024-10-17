import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '@/components/screens/MapScreen';
import AddJamScreen from '@/components/screens/AddJamScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

const FooterBar = () => {
  

  return (
    <View style={styles.container}>
      <MapScreen />
      <AddJamScreen />
      <ProfileScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    padding: GlobalStyles.space.base,
    backgroundColor: 'black',
    borderTopWidth: 1,
    borderTopColor: Colors.primary,
  },
});

export default FooterBar;