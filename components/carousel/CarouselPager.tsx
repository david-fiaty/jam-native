import { StyleSheet, View } from 'react-native';

type Props = {
  data: [],
  pagerIndex: number,
}

export default function CarouselPager({ data, pagerIndex }: Props) {
  return (  
    <View style={styles.container}>
      {data.map((_, index) => {
        return (
          <View key={index} style={[styles.dot, {backgroundColor: pagerIndex == index ? 'black' : 'gray'}]}></View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'gray',
    height: 8,
    width: 8,
    marginHorizontal: 4,
    borderRadius: 8,
  },
});
