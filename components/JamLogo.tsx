import { StyleSheet, Text, Image, View } from 'react-native';
import X from '../assets/images/jam-logo.svg';

type Props = {
  width: number,
  height: number,
};

const JamLogo = ({width, height}: Props) => {
  return (
    <X width={width} height={height} />    
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
  },
});

export default JamLogo;