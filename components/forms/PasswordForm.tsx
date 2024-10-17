import { StyleSheet, View } from 'react-native';
import { Divider } from '@rneui/themed';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import InputTextField from '../fields/InputTextField';

const PasswordForm = () => {
  return (
    <View style={styles.container}>    
      <InputTextField placeholder="Current password" style={GlobalStyles.field} />
      <Divider style={GlobalStyles.divider} />
      <InputTextField placeholder="New password" style={GlobalStyles.field} />
      <InputTextField placeholder="Confirm new password" style={GlobalStyles.field} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: GlobalStyles.space.base,
  },
  buttonContainer: {
    width: '100%',
  },
  signup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: GlobalStyles.space.base,
  },
  button: {
    height: 45,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  field: {
    backgroundColor: '#FFFFFF',
    height: 45,
    borderColor: Colors.primary, 
  },
});

export default PasswordForm;