import { Image, View, StyleSheet } from 'react-native';

type Props = {
  uri: string,
  width: number,
  height: number,
};

export function SvgImage({uri, width, height}: Props) {
  return (
    <View style={[{width: width}, {height: height}]}>
      <Image source={uri} style={styles.image} />  
    </View>  
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
  },
});
