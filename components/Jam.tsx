import { GlobalStyles } from '@/constants/GlobalStyles';
import { StyleSheet, View, Text } from 'react-native';
import JamHeader from './jam/JamHeader';
import JamImages from './jam/JamImages';
import JamToolbar from './jam/JamToolbar';
import JamContent from './jam/JamContent';

type Props = {
  item: object,
  index: number,
};

const Jam = ({item, index}: Props) => {
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
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: GlobalStyles.border.color,
  },
});

export default Jam;