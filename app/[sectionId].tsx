import { StyleSheet } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout } from '@/constants/Layout';
import BaseTheme from "@/constants/BaseTheme";
import SectionView from '@/components/view/SectionView';

export default () => {
  return (
    <ThemeProvider theme={BaseTheme}>
      <SafeAreaView style={styles.container}>
        <SectionView />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Layout.colors.white,
  },
});

