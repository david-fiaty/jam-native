import { Image, View, StyleSheet } from 'react-native';
import X from './assets/images/jam-logo.svg';

type Props = {
  width: number,
  height: number,
};

const JamLogo = ({width, height}: Props) {
  return (
    <X style={[styles.image, {width: width}, {height: height}]} />    
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
  },
});

export default JamLogo;