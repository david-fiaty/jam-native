import { StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <ImageBase {...props} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default ImageView;