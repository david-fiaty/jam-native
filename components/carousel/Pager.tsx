import { StyleSheet, View } from 'react-native';

type Props = {
  data: [],
  pagerIndex: number,
}

export default function Pager({ data, pagerIndex }: Props) {
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
    backgroundColor: 'red',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'gray',
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
});
