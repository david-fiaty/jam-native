import { StyleSheet, View, Text } from 'react-native';
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
      <Button 
        title="View more" 
        type="clear" 
        titleStyle={styles.text} 
        onPress={() => console.log('clicked')} 
      />
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
});

export default ItemContent;