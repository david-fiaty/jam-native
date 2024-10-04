import { StyleSheet, View, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  item: object,
  index: number,
};

const ItemToolbar = ({item, index}: Props) => {
  return (
    <View style={styles.container}>
      <View>        
        <AntDesign name="arrowdown" size={24} color={GlobalStyles.text.color} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ItemToolbar;