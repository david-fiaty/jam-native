import { createTheme } from '@rneui/themed';
import { Colors } from '@/constants/Colors';

const BaseTheme = createTheme({
  lightColors: {
    primary: Colors.primary,
  },
  components: {
    Button: {
      titleStyle: {
        color: '#FFFFFF',
        //fontFamily: 'BaseFont', // Todo - Enable font
      },
    },
  },
});

export default BaseTheme;