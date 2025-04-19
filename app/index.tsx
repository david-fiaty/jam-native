import { StyleSheet } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseTheme from "@/constants/BaseTheme";
import SectionView from '@/components/view/SectionView';
import BoxView from '@/components/view/BoxView';

export default () => {
  const { section } = useGlobalSearchParams();

  return (
    <ThemeProvider theme={BaseTheme}>
      <SafeAreaView style={styles.container}>
        <BoxView 
          direction="column" 
          align="center" 
          justify="center" 
          style={styles.container}
        >
          <SectionView name={section} />
        </BoxView>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: Colors.white,
  },
});

