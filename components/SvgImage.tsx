import { Image, View, StyleSheet } from 'react-native';

type Props = {
  uri: string,
  width: number,
  height: number,
};

export function SvgImage({uri, width, height}: Props) {
  return (
    <View style={styles.container}>
      <Image source={uri} style={[styles.image, {width: width}, {height: height}]} />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  image: {
    alignSelf: "center",
  },
});
