import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/GlobalStyles';
import WelcomeScreen from '@/components/screens/WelcomeScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShareIcon from '@/components/icons/ShareIcon';
import CopyIcon from '@/components/icons/CopyIcon';

const Tab = createBottomTabNavigator();

function A() {
  return <View><Text>Home</Text></View>;
}

function B() {
  return <View><Text>Settings</Text></View>;
}

function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Arm" 
        component={A} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <ShareIcon size={20} />
          ),
        }}  
      />
      <Tab.Screen 
        name="Base" 
        component={B} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <CopyIcon size={20} />
          ),
        }}  
      />
    </Tab.Navigator>
  );
}


const Index = () => {
  return (  
    <View style={styles.container}>
      <WelcomeScreen />
      <TabsNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    /*
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    alignContent: 'center',
    backgroundColor: Colors.background,
    height: '100%',*/
  },
});

export default Index;
