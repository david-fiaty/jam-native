const colors = {
  primary: '#0A00AA',
  secondary: '#E1E0F4',
  tertiary: '#FAA000',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
};

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
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  secondary: {
    borderWidth: borderWidth.base,
    borderColor: colors.secondary,
    backgroundColor: colors.secondary,
  },
  tertiary: {
    borderWidth: borderWidth.base,
    borderColor: colors.tertiary,
    backgroundColor: colors.tertiary,
  },
  white: {
    borderWidth: borderWidth.base,
    borderColor: colors.white,
    backgroundColor: colors.white,
  }
};

const logo: any = {
  size: 48,
};

const mapStyle: any = [
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.icon", 
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "poi", 
    "elementType": "labels",
    "stylers": [
      { 
        "visibility": "off",
      }
    ],
  },
  {
    "featureType": "transit",
    "elementType": "labels",
    "stylers": [
      { 
        "visibility": "off" ,
      }
    ],
  },
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": colors.white,
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": colors.secondary,
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": colors.gray,
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": colors.gray,
      }
    ]
  }
];

export const Layout = {
  colors: colors,
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
    borderBottomColor: colors.primary,
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
    backgroundColor: colors.white,
  },
  mainContent: {
    width: '100%',
    backgroundColor: colors.white,
    zIndex: 0,
  },
  formContainer: {
    width: "100%",
    gap: space.base,
    backgroundColor: colors.white,
  },
  formField: {
    backgroundColor: colors.secondary,
    borderWidth: borderWidth.base, 
    borderColor: colors.secondary, 
    borderRadius: radius.round,
    height: space.base*4,
  },
  borderedListContainer: {
    width: '100%',
    borderWidth: borderWidth.base,
    borderRadius: radius.round,
    borderColor: colors.primary,
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
  fieldSelectionPreview: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.base,
    padding: space.base,
    backgroundColor: colors.secondary,
    borderWidth: borderWidth.base, 
    borderColor: colors.secondary, 
    borderRadius: radius.round,
    justifyContent: 'flex-start',
  },
  imageSlideshow: {
    height: 336,
  }
};

