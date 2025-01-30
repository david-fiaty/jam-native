import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import ProfileForm from '@/components/form/ProfileForm';
import HeaderNavigation from '@/components/navigation/HeaderNavigation';
import FooterNavigation from '@/components/navigation/FooterNavigation';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <HeaderNavigation />
        <ProfileForm />
        <FooterNavigation />
      </ScreenView>
    </ThemeProvider>
  );
}
