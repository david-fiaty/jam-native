import { Image, StyleSheet } from 'react-native';
import CachedImage from 'expo-cached-image'
import { BaseProps } from '@/constants/Types';
import SpinnerView from './SpinnerView';

type Props = BaseProps & {
  path?: any,
  uri?: any,
  width?: string | number,
  height?: string | number,
  resizeMethod?: any,
  resizeMode?: any,
  style?: object, 
};

const ImageView = ({path, uri, width, height, resizeMethod, resizeMode, style}: Props) => {
  const source = path ? path : {uri: uri};
  
  resizeMethod = resizeMethod || 'scale';
  resizeMode = resizeMode || 'contain';

  return (
    <CachedImage
      source={source} 
      cacheKey={source}
      resizeMethod={resizeMethod}
      resizeMode={resizeMode}
      style={[styles.image, style, {width: width, height: height}]} 
      placeholderContent={<SpinnerView />}
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

export default ImageView;