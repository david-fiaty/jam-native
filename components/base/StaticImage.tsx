import { Image, StyleSheet } from 'react-native';

type Props = {
  source: string,
  width?: string | object,
  height?: number | object,
  resizeMethod?: string,
  resizeMode?: string,
};

export function StaticImage({source, width, height, resizeMethod, resizeMode}: Props) {
  return (
    <Image 
      source={source} 
      resizeMethod={resizeMethod || 'scale'}
      resizeMode={resizeMode || 'contain'}
      style={[styles.image, {width: width, height: height}]} 
    />   
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
  },
});
