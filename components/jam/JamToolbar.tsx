import { StyleSheet, View } from 'react-native';
import JamJammers from '@/components/jam/JamJammers';
import SaveJam from '@/components/jam/SaveJam';
import ShareJam from '@/components/jam/ShareJam';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  item: object,
  index: number,
};

const JamToolbar = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <JamJammers item={item} index={index} />
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
    paddingTop: 12,
    paddingRight: 14,
    paddingBottom: 8,
    paddingLeft: 14,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    gap: GlobalStyles.space,
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    gap: GlobalStyles.space,
  },
});

export default JamToolbar;