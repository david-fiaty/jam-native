import { StyleSheet, View, Text, Pressable } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import CollapsibleView from '@/components/CollapsibleView';

type Props = {
  item: object,
  index: number,
};

const JamContent = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={GlobalStyles.text}>
        {item.content}
      </Text>
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