import { StyleSheet, View, FlatList, Text } from 'react-native';

type Props = {
  item: object,
  index: number,
};

const JamItem = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <Text>{index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
  },
});

export default JamItem;