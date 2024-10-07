import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JamsMap from '../JamsMap';
import AddJam from '../AddJam';
import UserAccount from '../UserAccount';

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
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
          component={AddJam} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <AddJam />
            ),
          }}
        />
        <Tab.Screen 
          name="account" 
          component={AddJam} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <UserAccount />
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
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: 0,
  },
  pressable: {
    display: 'flex',
    marginTop: 10,
  },
});

export default BottomTabs;