import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

type Props = {
  item: object,
  index: number,
  scrollX: SharedValue<number>
}

const {width} = Dimensions.get('screen');

const data = [
  {
    id: 1,
    content: 'aaaa',
    link: 'aaa link',
  },
  {
    id: 2,
    content: 'bbb',
    link: 'bbb link',
  },
  {
    id: 3,
    content: 'aaaa',
    link: 'ccc link',
  },
];

export default function CarouselItem({item, index}: Props) {
  return (  
    <View style={styles.itemContainer}>
      <Text>{index}</Text>
      <Text>{item.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: width,
    backgroundColor: 'orange',
  },
});
