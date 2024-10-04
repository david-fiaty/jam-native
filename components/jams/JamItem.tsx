import { GlobalStyles } from '@/constants/GlobalStyles';
import { StyleSheet, View, FlatList, Text } from 'react-native';

type Props = {
  item: object,
  index: number,
};

const JamItem = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <Text>{index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: GlobalStyles.border.borderColor,
  },
});

export default JamItem;