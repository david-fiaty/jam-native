import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import PasswordForm from '@/components/form/PasswordForm';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <PasswordForm />
      </ScreenView>
    </ThemeProvider>
  );
}
