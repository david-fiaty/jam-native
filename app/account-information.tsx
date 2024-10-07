import { StyleSheet, View, Text} from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';

const AccountInformation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ACCOUNT INFORMATION
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column', 
    marginTop: 30,
    padding: 25,
  },
  text: {
    color: GlobalStyles.text.color,
  },
});

export default AccountInformation;