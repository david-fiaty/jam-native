import { Colors } from './Colors';
import DeviceManager from '@/classes/DeviceManager';

const space = {
  small: 5,
  base: 10,
  big: 20,
};

const footer = {
  height: 50,
};

const header = {
  height: 48,
};

export const Layout = {
  space: space,
  header: header,
  footer: footer,
  radius: {
    round: 8,
    circle: 40,
  },
  headerLogo: {
    width: 48,
    height: 48,
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
  modalContainer: {
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  animatedView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: footer.height,
    width: '100%',
    height: DeviceManager.modalView.height, 
    backgroundColor: 'lightblue',
  },
  modalContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: DeviceManager.modalView.height,
    backgroundColor: Colors.white,
  },
};

