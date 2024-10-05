export const Colors = {
  primary: '#0A00AA',
  secondary: '#FAA000',
  tertiary: '#E1E0F4',
  background: '#FFFFFF',
};

export const GlobalStyles = {
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
    fontSize: 14,
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
  input: {
    width: '80%',
    height: 45,
    borderWidth: 1, 
    borderColor: Colors.primary, 
    borderRadius: 6,
    paddingHorizontal: 12, 
    marginBottom: 10,
  },
  modal: {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
    },
    view: {
      backgroundColor: 'white',
      width: '100%',
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  },
};
