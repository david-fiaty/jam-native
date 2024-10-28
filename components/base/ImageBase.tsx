import { Image, StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';

type Props = BaseProps & {
  source: string,
  width?: string | number,
  height?: string | number,
  resizeMethod?: string,
  resizeMode?: string,
  style?: object, 
};

const ImageBase = ({source, width, height, resizeMethod, resizeMode, style}: Props) => {
  return (
    <Image 
      source={source} 
      resizeMethod={resizeMethod || 'scale'}
      resizeMode={resizeMode || 'contain'}
      style={[styles.image, style, {width: width, height: height}]} 
    />   
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    margin: 0,
    padding: 0,
  },
});

export default ImageBase;