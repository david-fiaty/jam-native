import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import LanguageForm from '@/components/form/LanguageForm';
import HeaderNavigation from '@/components/navigation/HeaderNavigation';
import FooterNavigation from '@/components/navigation/FooterNavigation';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <HeaderNavigation />
        <LanguageForm />
        <FooterNavigation />
      </ScreenView>
    </ThemeProvider>
  );
}
