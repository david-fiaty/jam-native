import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import JamActions from './JamActions';

type Props = {
  item: object,
  index: number,
};

const JamHeader = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.text}>
          @host +{item.host_count}
        </Text>
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
  text: GlobalStyles.text,
});

export default JamHeader;