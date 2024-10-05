import { StyleSheet, View, Text } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';

const NotificationsMenu = () => {
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
    paddingTop: 3,
    paddingRight: 6,
    paddingBottom: 3,
    paddingLeft: 6,
  },
});

export default NotificationsMenu;