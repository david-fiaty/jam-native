import { StyleSheet, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from '../view/TextView';
import ListView from '../view/ListView';

export default ({style, children}: BaseProps) => {
  return (
    <View style={styles.container}>
      <ListView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});
