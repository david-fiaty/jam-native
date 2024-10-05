import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@/constants/GlobalStyles';

const NotificationsIcon = () => {
  return (
    <View style={styles.container}>        
      <Text>+20</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
    borderRadius: 40,
    padding: 6,
  },
});

export default NotificationsIcon;