import { Colors } from './Colors';

const space: any = {
  small: 5,
  base: 10,
  big: 20,
};

const radius: any = {
  round: 8,
  circle: 40,
};

const fontSize: any = {
  small: 12,
  base: 14,
  big: 16,
};

const borderWidth: any = {
  small: 0.1,
  base: 0.7,
  big: 1,
};

const theme: any = {
  primary: {
    borderWidth: borderWidth.base,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  secondary: {
    borderWidth: borderWidth.base,
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary,
  },
  tertiary: {
    borderWidth: borderWidth.base,
    borderColor: Colors.tertiary,
    backgroundColor: Colors.tertiary,
  },
  white: {
    borderWidth: borderWidth.base,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
  }
};

const logo: any = {
  size: 48,
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
  theme: theme,
  space: space,
  radius: radius,
  fontSize: fontSize,
  borderWidth: borderWidth,
  lineHeight: 17,
  logo: logo,
  mapStyle: mapStyle,
  title: {
    fontWeight: 'bold',
    fontSize: fontSize.base,
  },
  titleContainer: {
    marginBottom: space.base*1.5,
  },
  modalTitleContainer: {
    marginLeft: space.base*1.5,
    marginBottom: space.base*1.5,
    width: '100%',
  },
  menuContainer: {
    height: '100%',
    flexGrow: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: space.base,
    borderBottomWidth: borderWidth.base,
    borderBottomColor: Colors.primary,
  },
  menuItemLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  screenContent: {
    padding: 0,
    width: '100%',
    height: '100%',
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  mainContent: {
    width: '100%',
    backgroundColor: Colors.white,
    zIndex: 0,
  },
  formContainer: {
    width: "100%",
    gap: space.base,
    backgroundColor: Colors.white,
  },
  formField: {
    backgroundColor: Colors.secondary,
    borderWidth: borderWidth.base, 
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
  backButtonContainer: {
    marginLeft: space.base*1.5,
  },
};

