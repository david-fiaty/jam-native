import { StyleSheet, View, Text } from 'react-native';
import TextBlock from '../base/TextBlock';

type Props = {
  index: number,
  item: {},
};

const MenuItem = ({item, index}: Props) => {
  return (
    <View style={styles.container}>      
      <TextBlock>{item.label}</TextBlock>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default MenuItem;