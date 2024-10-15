import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextBlock from '@/components/base/TextBlock';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  label: string,
  index?: number,
  onPress?: () => void,
};

const MenuItem = ({label, index, onPress}: Props) => {
  const ItemView = () => {
    return (        
      <TouchableOpacity onPress={onPress}>
        <TextBlock>{label}</TextBlock>
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
      <TextBlock>{label}</TextBlock>
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