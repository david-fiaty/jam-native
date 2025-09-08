import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  name: any,
  size?: number,
  containerStyle?: object,
  iconStyle?: object,
};

type IconProps = {
  iconStyle?: object,
  size?: number, 
}

const icons: any = {
  earth: ({iconStyle, size}: IconProps) => <Ionicons name="earth" size={size} style={iconStyle} />,
  list: ({iconStyle, size}: IconProps) => <Ionicons name="list-outline" size={size} style={iconStyle} />,
  location: ({iconStyle, size}: IconProps) => <Ionicons name="location-outline" size={size} style={iconStyle} />,
  pin: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={iconStyle} />,
  building: ({iconStyle, size}: IconProps) => <Ionicons name="business-sharp" size={size} style={iconStyle} />,
  calendar: ({iconStyle, size}: IconProps) => <Ionicons name="calendar-clear-outline" size={size} style={iconStyle} />,
  megaphone: ({iconStyle, size}: IconProps) => <Ionicons name="megaphone-outline" size={size} style={iconStyle} />,
  menu: ({iconStyle, size}: IconProps) => <Ionicons name="menu" size={size} style={iconStyle} />,
  plus: ({iconStyle, size}: IconProps) => <Ionicons name="add" size={size} style={iconStyle} />,
  save: ({iconStyle, size}: IconProps) => <Ionicons name="star-outline" size={size} style={iconStyle} />,
  search: ({iconStyle, size}: IconProps) => <Ionicons name="search-sharp" size={size} style={iconStyle} />,
  share: ({iconStyle, size}: IconProps) => <Ionicons name="share-social-outline" size={size} style={iconStyle} />,
  twitter: ({iconStyle, size}: IconProps) => <Ionicons name="logo-twitter" size={size} style={iconStyle} />,
  user: ({iconStyle, size}: IconProps) => <Ionicons name="person-outline" size={size} style={iconStyle} />,
  users: ({iconStyle, size}: IconProps) => <Ionicons name="people-outline" size={size} style={iconStyle} />,
  actions: ({iconStyle, size}: IconProps) => <Ionicons name="ellipsis-horizontal-sharp" size={size} style={iconStyle} />,
  toolbar: ({iconStyle, size}: IconProps) => <Ionicons name="ellipsis-vertical-sharp" size={size} style={iconStyle} />,
  copy: ({iconStyle, size}: IconProps) => <Ionicons name="copy-outline" size={size} style={iconStyle} />,
  email: ({iconStyle, size}: IconProps) => <Ionicons name="mail-outline" size={size} style={iconStyle} />,
  facebook: ({iconStyle, size}: IconProps) => <Ionicons name="logo-facebook" size={size} style={iconStyle} />,
  instagram: ({iconStyle, size}: IconProps) => <Ionicons name="logo-instagram" size={size} style={iconStyle} />,
  linkedin: ({iconStyle, size}: IconProps) => <Ionicons name="logo-linkedin" size={size} style={iconStyle} />,
  google: ({iconStyle, size}: IconProps) => <Ionicons name="logo-google" size={size} style={iconStyle} />,
  layers: ({iconStyle, size}: IconProps) => <Ionicons name="layers-outline" size={size} style={iconStyle} />,
  delete: ({iconStyle, size}: IconProps) => <Ionicons name="close-outline" size={size} style={iconStyle} />,
  close: ({iconStyle, size}: IconProps) => <Ionicons name="close-outline" size={size} style={iconStyle} />,
  report: ({iconStyle, size}: IconProps) => <Ionicons name="alert-circle-outline" size={size} style={iconStyle} />,
  edit: ({iconStyle, size}: IconProps) => <Ionicons name="create-outline" size={size} style={iconStyle} />,
  view: ({iconStyle, size}: IconProps) => <Ionicons name="albums-outline" size={size} style={iconStyle} />,
  left: ({iconStyle, size}: IconProps) => <Ionicons name="chevron-back" size={size} style={iconStyle} />,
  right: ({iconStyle, size}: IconProps) => <Ionicons name="chevron-forward" size={size} style={iconStyle} />,
  previous: ({iconStyle, size}: IconProps) => <Ionicons name="chevron-back" size={size} style={iconStyle} />,
  next: ({iconStyle, size}: IconProps) => <Ionicons name="chevron-forward" size={size} style={iconStyle} />,
  up: ({iconStyle, size}: IconProps) => <Ionicons name="chevron-up" size={size} style={iconStyle} />,
  down: ({iconStyle, size}: IconProps) => <Ionicons name="chevron-down" size={size} style={iconStyle} />,
  collapsed: ({iconStyle, size}: IconProps) => <Ionicons name="chevron-forward" size={size} style={iconStyle} />,
  expanded: ({iconStyle, size}: IconProps) => <Ionicons name="chevron-down" size={size} style={iconStyle} />,
  link: ({iconStyle, size}: IconProps) => <Ionicons name="link-outline" size={size} style={iconStyle} />,
  infinite: ({iconStyle, size}: IconProps) => <Ionicons name="infinite-outline" size={size} style={iconStyle} />,
  stack: ({iconStyle, size}: IconProps) => <Ionicons name="albums-outline" size={size} style={iconStyle} />,
  arrow: ({iconStyle, size}: IconProps) => <Ionicons name="caret-forward-outline" size={size} style={iconStyle} />,
  checkmark: ({iconStyle, size}: IconProps) => <Ionicons name="checkmark" size={size} style={iconStyle} />,
  return: ({iconStyle, size}: IconProps) => <Ionicons name="return-down-forward-sharp" size={size} style={iconStyle} />,
  like: ({iconStyle, size}: IconProps) => <Ionicons name="heart-outline" size={size} style={iconStyle} />,
  unlike: ({iconStyle, size}: IconProps) => <Ionicons name="heart-dislike-outline" size={size} style={iconStyle} />,
  filter: ({iconStyle, size}: IconProps) => <Ionicons name="filter-outline" size={size} style={iconStyle} />,
  exit: ({iconStyle, size}: IconProps) => <Ionicons name="exit-outline" size={size} style={iconStyle} />,
  refresh: ({iconStyle, size}: IconProps) => <Ionicons name="refresh-outline" size={size} style={iconStyle} />,
  upload: ({iconStyle, size}: IconProps) => <Ionicons name="cloud-upload-outline" size={size} style={iconStyle} />,
  image: ({iconStyle, size}: IconProps) => <Ionicons name="image-outline" size={size} style={iconStyle} />,
  phone: ({iconStyle, size}: IconProps) => <Ionicons name="keypad-outline" size={size} style={iconStyle} />,
  chat: ({iconStyle, size}: IconProps) => <Ionicons name="chatbox-outline" size={size} style={iconStyle} />,
  see: ({iconStyle, size}: IconProps) => <Ionicons name="eye-outline" size={size} style={iconStyle} />,
  blind: ({iconStyle, size}: IconProps) => <Ionicons name="eye-off-outline" size={size} style={iconStyle} />,
};

const IconBase = ({name, size, containerStyle, iconStyle}: Props) => {
  return (
    <View style={containerStyle}>
      {icons[name]({iconStyle, size})}
    </View>
  );
};

export default IconBase;