import { StyleSheet, View, Text } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';

const NotificationsIcon = () => {
  return (
    <View style={styles.container}>        
      <Text style={GlobalStyles.text}>20+</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
    borderRadius: 40,
    padding: 4,
  },
});

export default NotificationsIcon;