import { StyleSheet, View, Text, Pressable } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import CollapsibleView from '@/components/CollapsibleView';
import TextBlock from '../base/TextBlock';

type Props = {
  item: object,
  index: number,
};

const JamContent = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <TextBlock>{item.content}</TextBlock>
      <CollapsibleView />
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