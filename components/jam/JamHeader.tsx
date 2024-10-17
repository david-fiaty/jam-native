import { StyleSheet, View } from 'react-native';
import MoreActions from '@/components/jam/MoreActions';
import JamHosts from '@/components/jam/JamHosts';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  item: object,
  index: number,
};

const JamHeader = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <JamHosts item={item} index={index} />
      </View>
      <View style={styles.right}>
        <MoreActions />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: GlobalStyles.space.base*1.5,
    paddingVertical: GlobalStyles.space.base/1.5,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    gap: GlobalStyles.space.base,
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    gap: GlobalStyles.space.base,
  },
});

export default JamHeader;