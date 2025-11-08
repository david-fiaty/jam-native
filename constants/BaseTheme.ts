import { createTheme } from '@rneui/themed';
import { Layout } from './Layout';

const BaseTheme = createTheme({
  lightColors: {
    primary: Layout.colors.primary,
  },
  components: {
    Button: {
      titleStyle: {
        color: Layout.colors.white,
        fontWeight: 'normal',
      },
      buttonStyle: {
        backgroundColor: Layout.colors.primary,
        borderRadius: Layout.radius.round,
      },
    },
  },
});

export default BaseTheme;