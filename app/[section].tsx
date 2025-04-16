import { View, StyleSheet } from 'react-native';
import { Stack, useSegments, useRouter, Link } from 'expo-router';
import { useGlobalSearchParams } from 'expo-router';
import { ThemeProvider } from '@rneui/themed';
import BaseTheme from "@/constants/BaseTheme";
import ScreenView from '@/components/view/ScreenView';
import TextView from '@/components/view/TextView';
import BoxView from '@/components/view/BoxView';

export default () => {

  const router = useRouter();
  const { section } = useGlobalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <BoxView direction="column" align="center" justify="center" style={styles.container}>
          <TextView>home</TextView>
        </BoxView>
      </ScreenView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});