import { Image, View, StyleSheet } from 'react-native';

type Props = {
  uri: string,
  width: number,
  height: number,
};

export function ShareIcon({uri, width, height}: Props) {
  return (
    <Image 
      source={uri} 
      resizeMethod="scale"
      resizeMode="contain"
      style={[styles.image, {width: width}, {height: height}]} 
    />   
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
  },
});
