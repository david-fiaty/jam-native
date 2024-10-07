import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import JamsMap from '../JamsMap';
import AddJam from '../AddJam';
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
              <Pressable style={styles.pressable} onPress={() => router.push('/jams') }>
                <Ionicons name="add" size={26} color={Colors.primary} />
              </Pressable>
            ),
          }}
        />
        <Tab.Screen 
          name="account" 
          component={AddJam} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <Pressable style={styles.pressable} onPress={() => router.push('/jams') }>
                <Ionicons name="person-circle" size={26} color={Colors.primary} />
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
  pressable: {
    display: 'flex',
    marginTop: 10,
  },
});

export default BottomTabs;