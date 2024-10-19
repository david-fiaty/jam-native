import { Button } from '@rneui/themed';
import { ThemeProvider } from '@rneui/themed';
import BaseTheme from "@/constants/BaseTheme";
import ViewportContainer from '../base/ViewportContainer';

export default function MainScreen() {
  return (
    <ThemeProvider theme={BaseTheme}>
      <ViewportContainer>
        <Button title="My Button" />
      </ViewportContainer>
    </ThemeProvider>
  );
}
