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
      <View>
        <Text style={styles.text}>User name</Text>
      </View>
      <View>
        <Ionicons name="ellipsis-horizontal-sharp" size={24} color={GlobalStyles.color.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingRight: 14,
    paddingBottom: 8,
    paddingLeft: 14,
  },
  text: GlobalStyles.text,
});

export default ItemHeader;