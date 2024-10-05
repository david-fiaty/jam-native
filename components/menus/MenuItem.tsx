import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  index: number,
  item: {},
};

const MenuItem = ({item, index}: Props) => {
  return (
    <View style={styles.container}>      
      <Text style={styles.text}>{item.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  text: {
    ...GlobalStyles.text,
    ...{
      paddingTop: 14,
      paddingRight: 0,
      paddingBottom: 14,
      paddingLeft: 0,
      borderBottomWidth: 1,
    },
  },
});

export default MenuItem;