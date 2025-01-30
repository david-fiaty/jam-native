import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import AccountForm from '@/components/form/AccountForm';
import HeaderNavigation from '@/components/navigation/HeaderNavigation';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <HeaderNavigation />
        <AccountForm />
      </ScreenView>
    </ThemeProvider>
  );
}
