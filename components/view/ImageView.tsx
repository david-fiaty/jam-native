import { BaseProps } from '@/constants/Types';
import ImageBase from '../base/ImageBase';
import { View } from 'react-native';

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
    <View>
      <ImageBase {...props} />
    </View>
  );
};

export default ImageView;