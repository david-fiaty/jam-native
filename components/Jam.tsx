import { GlobalStyles } from '@/constants/GlobalStyles';
import { StyleSheet, View, Text } from 'react-native';
import ItemHeader from './jam/ItemHeader';
import ItemImages from './jam/ItemImages';
import ItemToolbar from './jam/ItemToolbar';
import ItemContent from './jam/ItemContent';

type Props = {
  item: object,
  index: number,
};

const Jam = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <ItemHeader item={item} index={index} />
      <ItemImages item={item} index={index} />
      <ItemToolbar item={item} index={index} />
      <ItemContent item={item} index={index} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: GlobalStyles.border.color,
  },
});

export default Jam;