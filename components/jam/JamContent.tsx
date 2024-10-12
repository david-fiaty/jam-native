import { StyleSheet, View } from 'react-native';
import CollapsibleBlock from '@/components/base/CollapsibleBlock';
import TextBlock from '@/components/base/TextBlock';

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
    paddingTop: 8,
    paddingRight: 14,
    paddingBottom: 8,
    paddingLeft: 14,
  },
});

export default JamContent;