import { StyleSheet } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import BaseTheme from "@/constants/BaseTheme";
import SectionView from '@/components/section/SectionView';

export default () => {
  const { section } = useGlobalSearchParams();

  return (
    <ThemeProvider theme={BaseTheme}>
      <SafeAreaView style={styles.container}>
        <SectionView name={section} />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

