import { StyleSheet, View } from 'react-native';
import JamActions from '@/components/jam/JamActions';
import JamHosts from '@/components/jam/JamHosts';

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
        <JamActions />
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
    paddingTop: 8,
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

export default JamHeader;