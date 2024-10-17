const space = 10;

export const Colors = {
  primary: '#0A00AA',
  secondary: '#FAA000',
  tertiary: '#E1E0F4',
  background: '#FFFFFF',
};

export const GlobalStyles = {
  space: {
    base: space,
    container: space,
  },
  toolbar: {
    height: 46,
  },
  tabsbar: {
    height: 50,
    icon: {
      size: 24,
      color: Colors.primary,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    alignContent: 'center',
    backgroundColor: Colors.background,
    height: '100%',
  },
  text: {
    color: Colors.primary,
    fontSize: 13.5,
  },
  border: {
    color: Colors.primary,
    borderWidth: 1,
    borderRadius: space,
  },
  divider: {
    width: '100%', 
    borderColor: Colors.tertiary, 
    marginVertical: space/2,
  },
  icon: {
    color: Colors.primary,
    backgroundColor: Colors.secondary,
    textAlign: 'center',
    verticalAlign: 'middle',
    size: 14,
    primary: {
      backgroundColor: Colors.primary,
      borderColor: Colors.primary,
      borderWidth: 1,
      padding: 6,
      borderRadius: 40,
    },
    secondary: {
      backgroundColor: Colors.secondary,
      borderColor: Colors.secondary,
      borderWidth: 1,
      padding: 6,
      borderRadius: 40,
    },
    tertiary: {
      backgroundColor: Colors.tertiary,
      borderColor: Colors.tertiary,
      borderWidth: 1,
      padding: 6,
      borderRadius: 40,
    },
    clear: {
      backgroundColor: '#FFFFFF',
      borderColor: '#FFFFFF',
      borderWidth: 1,
      padding: 6,
      borderRadius: 40,
    },
  },
  pager: {
    color: Colors.primary,
  },
  field: {
    backgroundColor: Colors.tertiary,
    width: '100%',
    height: 36,
    borderWidth: 1, 
    borderColor: Colors.tertiary, 
    borderRadius: space,
    paddingHorizontal: space, 
    justifyContent: 'center',
  },
};
