import { createTheme } from '@rneui/themed';

export default createTheme({
  lightColors: {
    primary: 'red',
  },
  darkColors: {
    primary: 'blue',
  },

  components: {
    Button: {
      titleStyle: {
        color: 'black',
      },
    },
  },
});
