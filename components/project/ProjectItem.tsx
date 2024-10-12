import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/GlobalStyles';
import TextBlock from '../base/TextBlock';

type Props = {
  item: object,
  index: number,
};

export function ProfileProject({item, index}: Props) {
  return (
    <View style={styles.container}>
    <TextBlock>{item.name}</TextBlock>   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: Colors.tertiary,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.tertiary,
    width: 80,
    height: 80,
  },
});
