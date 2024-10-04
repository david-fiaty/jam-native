const color = {
  primary: '#0A00AA',
  secondary: '#FAA000',
  background: '#FFFFFF',
};

export const GlobalStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    alignContent: 'center',
    backgroundColor: color.background,
    height: '100%',
  },
  text: {
    color: color.primary,
    fontSize: 14,
  },
  input: {
    width: '80%',
    height: 45,
    borderWidth: 1, 
    borderColor: color.primary, 
    borderRadius: 6,
    paddingHorizontal: 12, 
    marginBottom: 10,
  },
  buttonContainer: {
    width: '80%',
    height: 45,
  },
};
