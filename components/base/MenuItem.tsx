import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import TextBlock from '@/components/base/TextBlock';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  item: object,
  index: number,
  onPress: () => void,
  path: string,
};

const MenuItem = ({item, index, path}: Props) => {
  const router = useRouter();

  return (
    <View style={styles.container}>      
      <TouchableOpacity onPress={() => router.push(item.path) }>
        <TextBlock>{item.label}</TextBlock>
      </TouchableOpacity>
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