import { Image, StyleSheet } from 'react-native';

type Props = {
  uri?: string,
  path?: string,
  width?: string | number,
  height?: string | number,
  resizeMethod?: string,
  resizeMode?: string,
  style?: object,
};

export function StaticImage({uri, path, width, height, resizeMethod, resizeMode, style}: Props) {
  const imageSource = path ? path : {
    uri: uri,
  };

  return (
    <Image 
      source={imageSource} 
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
