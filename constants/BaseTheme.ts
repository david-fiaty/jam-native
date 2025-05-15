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
    Input: {
      placeholderTextColor: Layout.colors.primary,
      containerStyle: Layout.formField,
      inputContainerStyle: {
        borderBottomWidth: 0,
      },
      inputStyle: {
        padding: 0,
        margin: 0,
        color: Layout.colors.primary,
        fontSize: Layout.fontSize.base,
      },
    },
  },
});

export default BaseTheme;