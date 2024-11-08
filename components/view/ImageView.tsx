import { Image, StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Config } from '@/constants/Config';
import CachedImage from 'expo-cached-image'
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
  
  if (Config.imageCacheEnabled === true && source.uri) {
    return (
      <CachedImage
        source={source} 
        resizeMethod={resizeMethod}
        resizeMode={resizeMode}
        style={[styles.image, style, {width: width, height: height}]} 
        cacheKey={source.uri}
        placeholderContent={<SpinnerView />}
      />   
    );
  }
  else {
    return (
      <Image
        source={source} 
        resizeMethod={resizeMethod}
        resizeMode={resizeMode}
        style={[styles.image, style, {width: width, height: height}]} 
      />   
    );
  }
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    margin: 0,
    padding: 0,
  },
});

export default ImageView;