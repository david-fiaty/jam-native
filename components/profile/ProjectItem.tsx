import { StyleSheet, View, Text } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  item: object,
  index: number,
};

export function ProjectItem({item, index}: Props) {
  return (
    <View style={styles.container}>
    <Text style={GlobalStyles.text}>{item.name}</Text>   
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
