import { StyleSheet, TextInput, View } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

const ProfileForm = () => {
  return (
    <View style={styles.container}>    
      <TextInput
        style={GlobalStyles.field}
        placeholder="Full name"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={GlobalStyles.field}
        placeholder="IG handle"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={GlobalStyles.field}
        placeholder="Email"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={GlobalStyles.field}
        placeholder="Phone number"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={GlobalStyles.field}
        placeholder="Where am I now"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={GlobalStyles.field}
        placeholder="Main industries"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={GlobalStyles.field}
        placeholder="Sub industries"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={GlobalStyles.field}
        placeholder="Creative organisation"
        placeholderTextColor={GlobalStyles.text.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: GlobalStyles.space,
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
    borderRadius: 8,
    paddingHorizontal: 12, 
    marginBottom: 10,
  },
});

export default ProfileForm;