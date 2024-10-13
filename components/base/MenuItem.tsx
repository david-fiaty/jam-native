import { StyleSheet, View } from 'react-native';
import TextBlock from '@/components/base/TextBlock';

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