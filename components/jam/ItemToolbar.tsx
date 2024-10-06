import { StyleSheet, View } from 'react-native';
import SaveIcon from '../icons/SaveIcon';
import ShareIcon from '../icons/ShareIcon';
import JammersIcon from '../icons/JammersIcon';
import ItemJammers from './ItemJammers';

type Props = {
  item: object,
  index: number,
};

const ItemToolbar = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <ItemJammers />
      </View>
      <View style={styles.right}>
        <SaveIcon />
        <ShareIcon />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingRight: 14,
    paddingBottom: 8,
    paddingLeft: 14,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});

export default ItemToolbar;