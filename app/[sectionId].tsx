import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout } from '@/constants/Layout';
import SectionView from '@/components/view/SectionView';

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <SectionView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Layout.colors.white,
  },
});

