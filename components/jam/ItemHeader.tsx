import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  item: object,
  index: number,
};

const ItemHeader = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.text}>User name</Text>
      </View>
      <View style={styles.right}>
        <Ionicons name="ellipsis-horizontal-sharp" size={24} color={GlobalStyles.icon.color} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingRight: 14,
    paddingBottom: 8,
    paddingLeft: 14,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  text: GlobalStyles.text,
});

export default ItemHeader;