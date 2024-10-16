import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '@/components/screens/MapScreen';
import AddJamScreen from '@/components/screens/AddJamScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabs,
        }}
      >
        <Tab.Screen 
          name="map" 
          component={Text}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <MapScreen />
            ),
          }}
        />
        <Tab.Screen 
          name="add" 
          component={Text}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <AddJamScreen />
            ),
          }}
        />
        <Tab.Screen 
          name="account" 
          component={Text}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <ProfileScreen />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    display: 'flex',
    backgroundColor: 'red',
  },
  tabs: {
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: GlobalStyles.tabsbar.height,
  },
});

export default BottomTabs;