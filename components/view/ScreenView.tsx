import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Props } from '@/constants/Types';

export default ({style, children}: Props) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});
