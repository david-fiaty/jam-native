import { GlobalStyles } from '@/constants/GlobalStyles';
import { StyleSheet, View, Text } from 'react-native';
import ItemHeader from './ItemHeader';

type Props = {
  item: object,
  index: number,
};

const JamItem = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <ItemHeader item={item} index={index} />
      <Text>carousel</Text>
      <Text>toolbar</Text> 
      <Text>footer</Text> 
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