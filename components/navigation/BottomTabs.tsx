import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import JamsMap from '../JamsMap';
import AddJam from '../jam/AddJam';
import { Colors } from '@/constants/GlobalStyles';

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return <Ionicons name="home" size={40} color={Colors.primary} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Map" component={JamsMap} />
      <Tab.Screen name="Add" component={AddJam} />
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