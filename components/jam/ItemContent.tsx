import { GlobalStyles } from '@/constants/GlobalStyles';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
  item: object,
  index: number,
};

const ItemContent = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingRight: 14,
    paddingBottom: 8,
    paddingLeft: 14,
  },
  text: {
    color: GlobalStyles.text.color,
  },
});

export default ItemContent;