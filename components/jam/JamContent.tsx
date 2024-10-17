import { StyleSheet, View } from 'react-native';
import CollapsibleBlock from '@/components/base/CollapsibleBlock';
import TextBlock from '@/components/base/TextBlock';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  item: object,
  index: number,
};

const JamContent = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <TextBlock>{item.content}</TextBlock>
      <CollapsibleBlock />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GlobalStyles.space.base*1.5,
  },
});

export default JamContent;