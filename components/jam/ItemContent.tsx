import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Button } from '@rneui/themed';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  item: object,
  index: number,
};

const ItemContent = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.content}</Text>
      <Pressable style={styles.pressable} onPress={() => console.log('Clicked')}>
        <Text style={styles.text}>View more</Text>
      </Pressable>
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
  text: GlobalStyles.text,
  pressable: {
    marginTop: 15,
  },
});

export default ItemContent;