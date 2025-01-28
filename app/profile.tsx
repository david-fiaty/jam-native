import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import ProfileForm from '@/components/form/ProfileForm';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <ProfileForm />
      </ScreenView>
    </ThemeProvider>
  );
}
