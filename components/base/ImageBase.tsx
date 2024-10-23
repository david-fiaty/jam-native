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
      width={width}
      height={height}
      style={[styles.image,style]} 
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