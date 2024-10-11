import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import MegaphoneIcon from '../icons/MegaphoneIcon';

const JamForm = () => {
  return (
    <View style={styles.container}>    
      <Text style={GlobalStyles.text}>What kind of Jam is it?</Text>
      <MegaphoneIcon size={32} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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