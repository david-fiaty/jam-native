import { StatusBar } from 'react-native';
import { Colors } from './Colors';
import DeviceManager from '@/manager/DeviceManager';

const space: any = {
  small: 5,
  base: 10,
  big: 20,
};

const radius: any = {
  round: 8,
  circle: 40,
};

const iconSize: any = {
  small: 11,
  base: 14,
  big: 44,
};

const fontSize: any = {
  small: 12,
  base: 13,
  big: 24,
};

const borderWidth: any = {
  small: 0.1,
  base: 0.5,
  big: 1,
};

const header: any = {
  height: 48,
  width: DeviceManager.window.width,
  marginTop: StatusBar.currentHeight,
  paddingHorizontal: space.base*1.5,
  backgroundColor: Colors.white,
};

const logo: any = {
  size: 48,
};

const footer: any = {
  position: 'absolute',
  bottom: 50 + space.base*2,
  height: 50,
  width: '100%',
  borderTopWidth: 0.3,
  borderTopColor: Colors.primary,
  backgroundColor: Colors.white,
};

const modal: any = {
  width: DeviceManager.window.width,
  height: DeviceManager.window.height - DeviceManager.statusBar.height - header.height - footer.height,
};

const mapStyle: any = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": Colors.white,
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": Colors.secondary,
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": Colors.gray,
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": Colors.gray,
      }
    ]
  }
];

export const Layout = {
  space: space,
  radius: radius,
  iconSize: iconSize,
  fontSize: fontSize,
  borderWidth: borderWidth,
  header: header,
  logo: logo,
  footer: footer,
  mapStyle: mapStyle,
  animation: {
    duration: 300,
  },
  headerLeft: {
    gap: space.base,
  },
  headerRight: {
    flexDirection: 'row',
    gap: space.base*1.1,
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
    zIndex: 0,
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
    zIndex: 100,
  },
  formContainer: {
    width: "100%",
    gap: space.base,
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
  borderedListContainer: {
    width: '100%',
    borderWidth: borderWidth.base,
    borderRadius: radius.round,
    borderColor: Colors.primary,
    padding: space.base/2,
  },
  listContainer: {
    width: '100%',
    flexGrow: 1,
  },
  listColumnWrapper: {
    gap: space.base,
  },
  listItem: {
    padding: space.small,
  },
  textLink: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  backButtonContainer: {
    marginLeft: space.base*1.5,
  },
};

