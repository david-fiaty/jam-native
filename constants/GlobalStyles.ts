export const Colors = {
  primary: '#0A00AA',
  secondary: '#FAA000',
  tertiary: '#E1E0F4',
  background: '#FFFFFF',
};

export const GlobalStyles = {
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
  },
  icon: {
    color: Colors.primary,
    backgroundColor: Colors.secondary,
  },
  pager: {
    color: Colors.primary,
  },
  modal: {
    wrapper: {
      gap: 15,
      padding: 15,
      borderWidth: 1,
      borderColor: Colors.primary,
      borderRadius: 8,
      width: '100%',
    },
  },
};
