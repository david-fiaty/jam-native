import { createTheme } from '@rneui/themed';
import { Colors } from '@/constants/Colors';

export default createTheme({
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
