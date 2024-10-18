import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import ClearIcon from '@/components/icons/ClearIcon';
import DeviceManager from '@/classes/DeviceManager';
import AddJamScreen from '@/components/screens/AddJamScreen';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ViewportContainer from '@/components/base/ViewportContainer';
import MapScreen from '@/components/screens/MapScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';

const Index = () => {
  const [mapTabActive, setMapTabActive] = useState(false);
  const [addTabActive, setAddTabActive] = useState(false);
  const [profileTabActive, setProfileTabActive] = useState(false);
  
  return (  
    <ViewportContainer>
      <View style={styles.container}>
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.item} onPress={() => setMapTabActive(!mapTabActive)}>
            <ClearIcon name="location" size={GlobalStyles.footer.icon.size} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => setAddTabActive(!addTabActive)}>
            <ClearIcon name="plus" size={GlobalStyles.footer.icon.size} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => setProfileTabActive(!profileTabActive)}>
            <ClearIcon name="user" size={GlobalStyles.footer.icon.size} />
          </TouchableOpacity>
        </View>

        <View style={styles.modal}>
          {mapTabActive && (<MapScreen />)}
          {addTabActive && (<AddJamScreen />)}
          {profileTabActive && (<ProfileScreen />)}
        </View>
      </View>
    </ViewportContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: GlobalStyles.space.base,
    borderTopWidth: 1,
    borderTopColor: Colors.primary,
  },
  item: {
    paddingHorizontal: GlobalStyles.space.container*2,
  },
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: GlobalStyles.footer.height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    width: '100%',
    padding: GlobalStyles.space.container,
    paddingBottom: 0,
    height: DeviceManager.modal.height - GlobalStyles.header.height + GlobalStyles.space.base,
  },
});

export default Index;