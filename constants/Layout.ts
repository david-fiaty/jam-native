import { StatusBar } from 'react-native';
import { Colors } from './Colors';
import DeviceManager from '@/classes/DeviceManager';

const space = {
  small: 5,
  base: 10,
  big: 20,
};

const radius = {
  round: 8,
  circle: 40,
};

const iconSize = {
  small: 11,
  base: 20,
  big: 44,
};

const fontSize = {
  small: 12,
  base: 13.5,
  big: 24,
};

const header = {
  height: 48,
  marginTop: StatusBar.currentHeight,
  paddingHorizontal: space.base*1.5,
};

const logo = {
  width: 48,
  height: 48,
};

const footer = {
  height: 50,
  borderTopWidth: 0.3,
  borderTopColor: Colors.primary,
  backgroundColor: Colors.white,
};

const modal = {
  width: DeviceManager.window.width,
  height: DeviceManager.window.height - DeviceManager.statusBar.height - header.height - footer.height,
};

export const Layout = {
  space: space,
  radius: radius,
  iconSize: iconSize,
  fontSize: fontSize,
  header: header,
  logo: logo,
  footer: footer,
  animation: {
    duration: 300,
  },
  headerLeft: {
    gap: space.base,
  },
  headerRight: {
    flexDirection: 'row',
    gap: space.base,
  },
  headerLogo: {
    width: 48,
    height: 48,
  },
  menuContainer: {
    padding: space.base*1.5,
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
  screenContent: {
    padding: space.base*1.5,
    paddingBottom: 0,
    width: '100%',
    height: '100%',
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  mainContent: {
    width: '100%',
    height: modal.height,
    backgroundColor: Colors.white,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  modalContent: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: modal.height,
    backgroundColor: Colors.white,
  },
  animatedView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: footer.height,
    width: '100%',
    height: modal.height, 
    backgroundColor: Colors.white,
  },
  formField: {
    backgroundColor: Colors.secondary,
    borderWidth: 1, 
    borderColor: Colors.secondary, 
    borderRadius: radius.round,
    flexDirection: 'row',
    alignItems: 'center',
    height: space.base*4,
    justifyContent: 'flex-start',
  },
  listContainer: {
    width: '100%',
    flexGrow: 1,
  },
  listColumnWrapper: {
    gap: space.base,
  },
  borderedListContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: radius.round,
    borderColor: Colors.primary,
    padding: space.base,
  },
  listItem: {
    padding: space.small,
  },
};

