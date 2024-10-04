import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  item: object,
  index: number,
};

const ItemHeader = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons name="ellipsis-horizontal-sharp" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ItemHeader;