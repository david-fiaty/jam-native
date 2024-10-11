import { StyleSheet, TextInput, View } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

const ProfileForm = () => {
  return (
    <View style={styles.container}>    
      <TextInput
        style={styles.input}
        placeholder="Full name"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="IG handle"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="Where am I now"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="Main industries"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="Sub industries"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="Creative organisation"
        placeholderTextColor={GlobalStyles.text.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  wrapper: {
    width: '100%',
    paddingBottom: 40,
  },
  scroller: {
    flexGrow: 1,
  },  
  input: {
    backgroundColor: Colors.tertiary,
    width: '100%',
    height: 36,
    borderWidth: 1, 
    borderColor: Colors.tertiary, 
    borderRadius: 6,
    paddingHorizontal: 12, 
    marginBottom: 10,
  },
  button: {
    borderRadius: 30,
    overflow: 'hidden',
    paddingTop: 5,
    paddingBottom: 5,
    gap: 8,
  },
  title: {
    ...GlobalStyles.text,
    ...{
      fontWeight: 'bold',
      marginTop: 15,
    },
  },
  input: {
    backgroundColor: Colors.tertiary,
    width: '100%',
    height: 36,
    borderWidth: 1, 
    borderColor: Colors.tertiary, 
    borderRadius: 6,
    paddingHorizontal: 12, 
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
  },
});

export default ProfileForm;