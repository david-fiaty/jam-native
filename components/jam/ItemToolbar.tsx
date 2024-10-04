import { StyleSheet, View } from 'react-native';
import SaveIcon from '../icons/SaveIcon';
import ShareIcon from '../icons/ShareIcon';

type Props = {
  item: object,
  index: number,
};

const ItemToolbar = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <SaveIcon />
      <ShareIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ItemToolbar;