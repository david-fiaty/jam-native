import { GlobalStyles } from '@/constants/GlobalStyles';
import { StyleSheet, View, Text } from 'react-native';
import ItemHeader from './ItemHeader';
import ItemCarousel from './ItemCarousel';
import ItemToolbar from './ItemToolbar';
import ItemContent from './ItemContent';

type Props = {
  item: object,
  index: number,
};

const JamItem = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <ItemHeader item={item} index={index} />
      <ItemCarousel item={item} index={index} />
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
    borderColor: GlobalStyles.border.borderColor,
  },
});

export default JamItem;