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

const header = {
  height: 48,
  marginTop: DeviceManager.statusBar.height,
  paddingHorizontal: space.base,
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

export const Layout = {
  space: space,
  radius: radius,
  header: header,
  logo: logo,
  footer: footer,
  fontSize: 14,
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
    padding: space.base,
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
};

