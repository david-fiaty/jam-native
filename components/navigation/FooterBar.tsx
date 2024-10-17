
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

import ClearIcon from '../icons/ClearIcon';
import TabElement from '../base/TabElement';
import AddJamScreen from '../screens/AddJamScreen';

const FooterBar = () => {
  const [isMapTabActive, setIsMapTabActive] = useState(false);
  const [isAddJamTabActive, setIsAddJamTabActive] = useState(false);
  const [isAddProfileTabActive, setIsAddProfileTabActive] = useState(false);

  return (
    <View style={styles.container}>
      <TabElement 
        label={<ClearIcon name="plus" size={GlobalStyles.footer.icon.size} />} 
        content={<AddJamScreen />} 
      />
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
    height: GlobalStyles.footer.height,
    //padding: GlobalStyles.space.base,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.primary,
  },
});

export default FooterBar;