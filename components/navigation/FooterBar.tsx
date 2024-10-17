
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
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