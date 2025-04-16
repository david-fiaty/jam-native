import { useGlobalSearchParams } from 'expo-router';
import { ThemeProvider } from '@rneui/themed';
import BaseTheme from "@/constants/BaseTheme";
import SectionView from '@/components/view/SectionView';

export default () => {
  const { section } = useGlobalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <SectionView name={section} />
    </ThemeProvider>
  );
}
