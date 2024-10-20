import { StyleSheet, View, FlatList } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from '../view/TextView';

export default ({style, children}: BaseProps) => {
  return (
    <View style={styles.container}>
      <TextView>Map View</TextView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});
