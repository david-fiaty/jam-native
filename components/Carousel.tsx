import { Text, Image, View, Button, StyleSheet, FlatList } from 'react-native';

export default function Carousel() {
  return (  
    <View style={styles.container}>
      <FlatList data={data} renderItem={({item, index}) => <CarouselItem item={item} index={index} />} />
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