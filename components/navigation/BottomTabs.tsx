import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JamsMap from '../jams/JamsMap';
import AddJam from '../jam/AddJam';
import UserProfile from '../user/UserProfile';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarStyle: styles.tabs,
        }}
      >
        <Tab.Screen 
          name="map" 
          component={Text}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <JamsMap />
            ),
          }}
        />
        <Tab.Screen 
          name="add" 
          component={Text}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <AddJam />
            ),
          }}
        />
        <Tab.Screen 
          name="account" 
          component={Text}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <UserProfile />
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
    borderTopColor: Colors.primary,
  },
  tabs: {
    paddingTop: 10,
  },
});

export default BottomTabs;