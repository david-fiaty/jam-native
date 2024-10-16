import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  name: string,
  size?: number,
  containerStyle?: object,
  iconStyle?: object,
};

type IconProps = {
  iconStyle?: object,
  size?: number, 
}

const icons = {
  location: ({iconStyle, size}: IconProps) => <Ionicons name="location-outline" size={size} style={iconStyle} />,
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
  copy: ({iconStyle, size}: IconProps) => <Ionicons name="copy-outline" size={size} style={iconStyle} />,
  email: ({iconStyle, size}: IconProps) => <Ionicons name="mail-outline" size={size} style={iconStyle} />,
  facebook: ({iconStyle, size}: IconProps) => <Ionicons name="logo-facebook" size={size} style={iconStyle} />,
  instagram: ({iconStyle, size}: IconProps) => <Ionicons name="logo-instagram" size={size} style={iconStyle} />,
  layers: ({iconStyle, size}: IconProps) => <Ionicons name="layers-outline" size={size} style={iconStyle} />,
  delete: ({iconStyle, size}: IconProps) => <Ionicons name="close-circle-outline" size={size} style={iconStyle} />,
  report: ({iconStyle, size}: IconProps) => <Ionicons name="alert-circle-outline" size={size} style={iconStyle} />,
  edit: ({iconStyle, size}: IconProps) => <Ionicons name="create-outline" size={size} style={iconStyle} />,
  view: ({iconStyle, size}: IconProps) => <Ionicons name="albums-outline" size={size} style={iconStyle} />,
  previous: ({iconStyle, size}: IconProps) => <Ionicons name="chevron-back" size={size} style={iconStyle} />,
  next: ({iconStyle, size}: IconProps) => <Ionicons name="chevron-forward" size={size} style={iconStyle} />,
  link: ({iconStyle, size}: IconProps) => <Ionicons name="link-outline" size={size} style={iconStyle} />,
  infinite: ({iconStyle, size}: IconProps) => <Ionicons name="infinite-outline" size={size} style={iconStyle} />,
  stack: ({iconStyle, size}: IconProps) => <Ionicons name="albums-outline" size={size} style={iconStyle} />,
};

const StaticIcon = ({name, size, containerStyle, iconStyle}: Props) => {
  return (
    <View style={containerStyle}>
      {icons[name]({iconStyle, size})}
    </View>
  );
};

export default StaticIcon;