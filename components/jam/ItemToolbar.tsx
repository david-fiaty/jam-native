import { StyleSheet, View, Text } from 'react-native';

type Props = {
  item: object,
  index: number,
};

const ItemToolbar = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <Text>toolbar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ItemToolbar;