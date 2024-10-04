import { StyleSheet, View, Text } from 'react-native';

type Props = {
  item: object,
  index: number,
};

const ItemContent = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <Text>content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ItemContent;