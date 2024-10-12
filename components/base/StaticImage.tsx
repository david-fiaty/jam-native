import { Image, StyleSheet } from 'react-native';

type Props = {
  source: string,
  width: number,
  height: number,
};

export function StaticImage({source, width, height}: Props) {
  return (
    <Image 
      source={source} 
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
