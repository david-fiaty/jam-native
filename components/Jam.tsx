import { GlobalStyles } from '@/constants/GlobalStyles';
import { StyleSheet, View, Text } from 'react-native';
import Header from './jam/Header';
import Images from './jam/Images';
import JamToolbar from './jam/JamToolbar';
import Content from './jam/Content';

type Props = {
  item: object,
  index: number,
};

const Jam = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <Header item={item} index={index} />
      <Images item={item} index={index} />
      <JamToolbar item={item} index={index} />
      <Content item={item} index={index} />
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