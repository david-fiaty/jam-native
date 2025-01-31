import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import PasswordForm from '@/components/form/PasswordForm';
import HeaderNavigation from '@/components/navigation/HeaderNavigation';
import FooterNavigation from '@/components/navigation/FooterNavigation';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <HeaderNavigation />
        <PasswordForm />
        <FooterNavigation />
      </ScreenView>
    </ThemeProvider>
  );
}
