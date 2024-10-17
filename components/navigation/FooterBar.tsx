
import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ClearIcon from '../icons/ClearIcon';
import AddJamScreen from '../screens/AddJamScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ModalTester from '../base/ModalTester';

const FooterBar = () => {
  const [isMapTabActive, setIsJamTabActive] = useState(false);
  const [isAddJamTabActive, setIsAddJamTabActive] = useState(false);
  const [isAddProfileTabActive, setIsAddProfileTabActive] = useState(false);

  return (
    <View style={styles.container}>
      <ModalTester />
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
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.primary,
  },
});

export default FooterBar;