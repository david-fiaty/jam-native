import { Image, StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import ImageBase from '../base/ImageBase';

type Props = BaseProps & {
  source: string,
  width?: string | number,
  height?: string | number,
  resizeMethod?: string,
  resizeMode?: string,
  style?: object, 
};

const ImageView = (props: Props) => {
  return (
    <ImageBase {...props} />
  );
};

export default ImageView;