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
      containerStyle: {
        backgroundColor: Colors.secondary,
        borderWidth: 1, 
        borderColor: Colors.secondary, 
        borderRadius: Layout.radius.round,
        justifyContent: 'flex-start',
      },
      inputContainerStyle: {
        borderBottomWidth: 0,
        backgroundColor: 'red',
      },
    },
  },
});

export default BaseTheme;