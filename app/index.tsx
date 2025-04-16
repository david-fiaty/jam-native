import { StyleSheet } from 'react-native';
import { Stack, useSegments, useRouter, Link } from 'expo-router';
import { useGlobalSearchParams } from 'expo-router';
import { ThemeProvider } from '@rneui/themed';
import BaseTheme from "@/constants/BaseTheme";
import TextView from '@/components/view/TextView';
import SectionView from '@/components/view/SectionView';

export default () => {

  const router = useRouter();
  const { section } = useGlobalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <SectionView name="my section" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});