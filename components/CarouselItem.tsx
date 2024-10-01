import { Text, Image, View, Button, StyleSheet, FlatList } from 'react-native';

type Props = {
  item: object,
  index: number,
}


export default function CarouselItem({item, index}: Props) {
  return (  
    <View>
      <Text>{index}</Text>
      <Text>{item.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    width: '100%',
    height: 200,
  },
});

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