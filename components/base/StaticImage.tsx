import { Image, StyleSheet } from 'react-native';

type Props = {
  source: string,
  width?: string | number,
  height?: number | number,
  resizeMethod?: string,
  resizeMode?: string,
  style?: object,
};

export function StaticImage({source, width, height, resizeMethod, resizeMode, style}: Props) {
  return (
    <Image 
      source={source} 
      resizeMethod={resizeMethod || 'scale'}
      resizeMode={resizeMode || 'contain'}
      style={[
        styles.image, 
        {width: width, height: height}, 
        style]
      } 
    />   
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
  },
});
