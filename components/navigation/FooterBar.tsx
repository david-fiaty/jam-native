
import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ClearIcon from '../icons/ClearIcon';
import AddJamScreen from '../screens/AddJamScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TestModal from '../TestModal';
import TestScreen from '../TestScreen';

const FooterBar = () => {
  const [isMapTabActive, setIsMapTabActive] = useState(false);
  const [isAddJamTabActive, setIsAddJamTabActive] = useState(false);
  const [isAddProfileTabActive, setIsAddProfileTabActive] = useState(false);

  return (
    <View style={styles.container}>
      <TestModal />
      <TestScreen />
      <TouchableWithoutFeedback>
      <TouchableOpacity onPress={() => {
        setIsAddJamTabActive(!isAddJamTabActive);
        console.log(isAddJamTabActive);
      }}>
      
        <ClearIcon name="plus" size={GlobalStyles.footer.icon.size} />
      </TouchableOpacity>
      </TouchableWithoutFeedback>

      {isAddJamTabActive && (<AddJamScreen />) }
      
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