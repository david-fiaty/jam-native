import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/GlobalStyles';

type Props = {
  item: object,
  index: number,
};

const Images = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
    width: '100%',
    height: 280,
    opacity: 0.7,
  },
});

export default Images;