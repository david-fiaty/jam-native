import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import AccountForm from '@/components/form/AccountForm';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <AccountForm />
      </ScreenView>
    </ThemeProvider>
  );
}
