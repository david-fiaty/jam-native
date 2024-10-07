import { StyleSheet, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import JamsMap from '../JamsMap';
import AddJam from '../jam/AddJam';
import { Colors } from '@/constants/GlobalStyles';

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
          name="Map" 
          component={JamsMap} 
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({ color, size }) => (
              <Pressable style={styles.pressable} onPress={() => router.push('/jams') }>
                <Ionicons name="location" size={40} color={Colors.primary} />
              </Pressable>
            ),
          }}
        />
        <Tab.Screen 
          name="Add" 
          component={AddJam} 
          options={{
            tabBarLabel: 'Add',
            tabBarIcon: ({ color, size }) => (
              <Pressable style={styles.pressable} onPress={() => router.push('/jams') }>
                <Ionicons name="add" size={40} color={Colors.primary} />
              </Pressable>
            ),
          }}
        />
        <Tab.Screen 
          name="Account" 
          component={AddJam} 
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <Pressable style={styles.pressable} onPress={() => router.push('/jams') }>
                <Ionicons name="person-circle" size={40} color={Colors.primary} />
              </Pressable>
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
});

export default BottomTabs;