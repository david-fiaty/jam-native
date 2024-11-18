import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import LanguageForm from '@/components/form/LanguageForm';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <LanguageForm />
      </ScreenView>
    </ThemeProvider>
  );
}
