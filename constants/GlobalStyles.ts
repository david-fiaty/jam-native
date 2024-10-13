const space = 10;

export const Colors = {
  primary: '#0A00AA',
  secondary: '#FAA000',
  tertiary: '#E1E0F4',
  background: '#FFFFFF',
};

export const GlobalStyles = {
  space: space,
  statusbar: {
    height: 42,
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
  icon: {
    color: Colors.primary,
    backgroundColor: Colors.secondary,
    size: 14,
  },
  pager: {
    color: Colors.primary,
  },
  modal: {
    wrapper: {
      gap: space,
      padding: space,
      borderWidth: 1,
      borderColor: Colors.primary,
      borderRadius: space,
      width: '100%',
    },
  },
  tabs: {
    icon: {
      size: 26,
      color: Colors.primary,
    },
  },
  field: {
    backgroundColor: Colors.tertiary,
    width: '100%',
    height: 36,
    borderWidth: 1, 
    borderColor: Colors.tertiary, 
    borderRadius: space,
    paddingHorizontal: space, 
  },
};
