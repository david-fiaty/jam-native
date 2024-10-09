import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

const JamForm = () => {
  return (
    <View style={styles.container}>    
      <TextInput
        style={GlobalStyles.input}
        placeholder="Enter your email address"
        placeholderTextColor={GlobalStyles.text.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
  },
  continue: {
    width: '100%',
  },
  signup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    height: 45,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default JamForm;