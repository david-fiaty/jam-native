import { createTheme } from '@rneui/themed';
import { Colors } from '@/constants/Colors';
import { Layout } from './Layout';

const BaseTheme = createTheme({
  lightColors: {
    primary: Colors.primary,
  },
  components: {
    Button: {
      titleStyle: {
        color: Colors.white,
      },
      buttonStyle: {
        backgroundColor: Colors.primary,
        borderRadius: Layout.radius.round,
      },
    },
  },
});

export default BaseTheme;