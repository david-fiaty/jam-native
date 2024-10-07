import { StyleSheet, View } from 'react-native';
import JamJammers from './JamJammers';
import SaveJam from './SaveJam';
import ShareJam from './ShareJam';

type Props = {
  item: object,
  index: number,
};

const JamToolbar = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <JamJammers />
      </View>
      <View style={styles.right}>
        <SaveJam />
        <ShareJam />
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

export default JamToolbar;