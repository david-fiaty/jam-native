import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextBlock from '@/components/base/TextBlock';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  item: object,
  index?: number,
  onPress?: () => void,
};

const MenuItem = ({item, index, onPress}: Props) => {
  const ItemView = () => {
    return (        
      <TouchableOpacity onPress={onPress}>
        <TextBlock>{item.label}</TextBlock>
      </TouchableOpacity>
    );
  };

  if (onPress) {
    return (
      <View style={styles.container}>      
        <ItemView />
      </View>
    );
  }

  return (
    <View style={styles.container}>      
      <TextBlock>{item.label}</TextBlock>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    gap: GlobalStyles.space,
    padding: GlobalStyles.space,
  },
});

export default MenuItem;