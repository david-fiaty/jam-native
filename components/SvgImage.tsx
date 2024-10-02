import { Image, View, StyleSheet } from 'react-native';

export function SvgImage() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/jam-logo.png')} style={styles.image} />    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    marginTop: 100,
  },
  image: {
    alignSelf: "center",
  },
});
