import { createTheme } from '@rneui/themed';
import { Colors } from '@/constants/Colors';

export default createTheme({
  lightColors: {
    primary: Colors.primary,
  },
  components: {
    Text: {
      style: {
        color: Colors.primary,
        fontFamily: 'BaseFont',
      },
    },
    Button: {
      titleStyle: {
        color: '#FFFFFF',
        fontFamily: 'BaseFont',
      },
    },
    ListItem: {
      
    },
  },
});
