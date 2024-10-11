import { StyleSheet, Text, Image, View } from 'react-native';

const WelcomeScreen = ({width, height}: Props) => {
  return (
    <View>
      <X width={width} height={height} />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default WelcomeScreen;