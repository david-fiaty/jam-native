import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import ClearIcon from '@/components/icons/ClearIcon';
import DeviceManager from '@/classes/DeviceManager';
import AddJamScreen from '@/components/screens/AddJamScreen';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ViewportContainer from '@/components/base/ViewportContainer';
import MapScreen from '@/components/screens/MapScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import JamsScreen from '@/components/screens/JamsScreen';

const Index = () => {
  const [mapTabActive, setMapTabActive] = useState(false);
  const [addTabActive, setAddTabActive] = useState(false);
  const [profileTabActive, setProfileTabActive] = useState(false);
  
  return (  
    <ViewportContainer>
      <View style={styles.container}>
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.item} onPress={() => {
            setMapTabActive(!mapTabActive);
            setAddTabActive(false);
            setProfileTabActive(false);
          }}>
            <ClearIcon 
              name="location" 
              size={GlobalStyles.footer.icon.size} 
              containerStyle={mapTabActive ? styles.active : {}}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {
            setMapTabActive(false);
            setAddTabActive(!addTabActive);
            setProfileTabActive(false);
          }}>
            <ClearIcon 
              name="plus" 
              size={GlobalStyles.footer.icon.size} 
              containerStyle={addTabActive ? styles.active : {}}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {
            setMapTabActive(false);
            setAddTabActive(false);
            setProfileTabActive(!profileTabActive);
          }}>
            <ClearIcon 
              name="user" 
              size={GlobalStyles.footer.icon.size} 
              containerStyle={profileTabActive ? styles.active : {}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.modal}>
          {!mapTabActive && !addTabActive && !profileTabActive && (<JamsScreen />)}
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
    zIndex: 100,
  },
  item: {
    paddingHorizontal: GlobalStyles.space.container*2,
  },
  active: {
    backgroundColor: Colors.tertiary,
    borderRadius: 4,
  },
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: GlobalStyles.footer.height,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    width: '100%',
    padding: GlobalStyles.space.container,
    paddingBottom: 0,
    height: DeviceManager.modal.height - GlobalStyles.header.height + GlobalStyles.space.base,
    zIndex: 0,
  },
});

export default Index;