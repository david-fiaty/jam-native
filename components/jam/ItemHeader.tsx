import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  item: object,
  index: number,
};

const ItemHeader = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <Text>User name</Text>
      <Ionicons name="ellipsis-horizontal-sharp" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ItemHeader;