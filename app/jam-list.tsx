import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';

const JamListScreen = () => {
  return (  
    <View style={GlobalStyles.container}>
      <Text>Jam list</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    justifyContent: "center",
    alignItems: 'center',
  },
  loginContainer: {
    marginTop: 40,
  },
  loginButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default JamListScreen;
