import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  index: number,
  item: {},
};

const MenuItem = ({item, index}: Props) => {
  return (
    <View style={styles.container}>        
      <Text style={styles.text}>{item.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  text: GlobalStyles.text,
});

export default MenuItem;