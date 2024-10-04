import { GlobalStyles } from '@/constants/GlobalStyles';
import { StyleSheet, View, FlatList, Text } from 'react-native';

type Props = {
  item: object,
  index: number,
};

const JamItem = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>header</Text> 
        <Text>carousel</Text>
        <Text>toolbar</Text> 
        <Text>footer</Text> 
      </View>
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
  header: {

  },
  toolbar: {

  },
});

export default JamItem;