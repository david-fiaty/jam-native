import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '@/constants/GlobalStyles';

const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={GlobalStyles.container}>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
      <Text>About Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default AboutScreen;