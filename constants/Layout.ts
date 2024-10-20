import { Colors } from './Colors';

const space = {
  small: 5,
  base: 10,
  big: 20,
};

export const Layout = {
  space: space,
  radius: {
    round: 8,
    circle: 40,
  },
  header: {
    height: 48,
  },
  headerLogo: {
    width: 48,
    height: 48,
  },
  footer: {
    height: 50,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: space.base,
    borderBottomWidth: 0.76,
    borderBottomColor: Colors.primary,
  },
  menuItemLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

