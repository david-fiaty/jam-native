import { GlobalStyles } from '@/constants/GlobalStyles';
import { StyleSheet, View, Text } from 'react-native';
import JamHeader from '@/components/jam/JamHeader';
import JamImages from '@/components/jam/JamImages';
import JamToolbar from '@/components/jam/JamToolbar';
import JamContent from '@/components/jam/JamContent';

type Props = {
  item: object,
  index: number,
};

const JamItem = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <JamHeader item={item} index={index} />
      <JamImages item={item} index={index} />
      <JamToolbar item={item} index={index} />
      <JamContent item={item} index={index} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: GlobalStyles.space*2,
    paddingBottom: GlobalStyles.space*1.5,
    borderWidth: 1,
    borderRadius: GlobalStyles.space,
    borderColor: GlobalStyles.border.color,
  },
});

export default JamItem;