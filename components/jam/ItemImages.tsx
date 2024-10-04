import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  item: object,
  index: number,
};

const ItemImages = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    width: '100%',
    height: 280,
  },
});

export default ItemImages;