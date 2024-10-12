export const Colors = {
  primary: '#0A00AA',
  secondary: '#FAA000',
  tertiary: '#E1E0F4',
  background: '#FFFFFF',
};

export const GlobalStyles = {
  gap: 10,
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
    size: 14,
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
  field: {
    backgroundColor: Colors.tertiary,
    width: '100%',
    height: 36,
    borderWidth: 1, 
    borderColor: Colors.tertiary, 
    borderRadius: 8,
    paddingHorizontal: 10, 
    marginBottom: 10,
  },
};
