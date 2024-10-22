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
        color: '#FFFFFF',
        //fontFamily: 'BaseFont', // Todo - Enable font
      },
    },
    Input: {
      style: {
        backgroundColor: Colors.secondary,
        width: '100%',
        borderWidth: 1, 
        borderColor: Colors.secondary, 
        borderRadius: Layout.radius.round,
        paddingHorizontal: Layout.space.base, 
        justifyContent: 'center',
      },
    },
  },
});

export default BaseTheme;