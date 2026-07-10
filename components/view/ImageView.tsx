import { Image, StyleSheet } from 'react-native';
import { Image as ExpoImage } from "expo-image";
import { Config } from '@/constants/Config';

type Props = {
  path?: any;
  uri?: any;
  width?: string | number;
  height?: string | number;
  resizeMethod?: any;
  resizeMode?: any;
  style?: object;
};

const ImageView = ({path, uri, width, height, resizeMethod, resizeMode, style}: Props) => {
  const source = path ? path : {uri: uri};
  
  resizeMethod = resizeMethod || 'scale';
  resizeMode = resizeMode || 'contain';
  
  if (Config.imageCacheEnabled === true) {
    return (
      <ExpoImage
        source={source} 
        contentFit="cover"
        cachePolicy="memory-disk"
        style={[styles.image, style, {width: width, height: height}]} 
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