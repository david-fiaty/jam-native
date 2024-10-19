import { createTheme } from '@rneui/themed';
import { Colors } from './Colors';

export default createTheme({
  lightColors: {
    primary: Colors.primary,
  },
  components: {
    Button: {
      titleStyle: {
        color: '#FFFFFF',
      },
    },
  },
});
