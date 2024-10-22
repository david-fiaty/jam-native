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
        //fontFamily: 'BaseFont', // Todo - Enable font
      },
    },
    Input: {
      placeholderTextColor: Colors.primary,
      containerStyle: Layout.formField,
      inputContainerStyle: {
        borderBottomWidth: 0,
        flexGrow: 1,
      },
      inputStyle: {
        padding: 0,
        margin: 0,
        color: Colors.primary,
        fontSize: Layout.fontSize,
      },
    },
  },
});

export default BaseTheme;