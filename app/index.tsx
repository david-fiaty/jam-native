import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import ClearIcon from '@/components/icons/ClearIcon';
import TabElement from '@/components/base/TabElement';
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
          <TouchableOpacity 
            onPress={() => {
              setMapTabActive(!mapTabActive);
            }}
          >
            <ClearIcon name="location" size={GlobalStyles.footer.icon.size} />
            <MapScreen />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              setAddTabActive(!addTabActive);
            }}
          >
            <ClearIcon name="plus" size={GlobalStyles.footer.icon.size} />
            <AddJamScreen />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              setProfileTabActive(!profileTabActive);
            }}
          >
            <ClearIcon name="user" size={GlobalStyles.footer.icon.size} />
            <ProfileScreen />
          </TouchableOpacity>
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
});

export default Index;