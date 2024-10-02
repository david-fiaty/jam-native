import { Image, View, StyleSheet } from 'react-native';

type Props = {
  uri: string,
};

export function SvgImage({uri}: Props) {
  return (
    <View style={styles.container}>
      <Image source={uri} style={styles.image} />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    marginTop: 100,
  },
  image: {
    alignSelf: "center",
  },
});
