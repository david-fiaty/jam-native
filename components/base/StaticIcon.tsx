import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  name?: string,
  size?: number,
  containerStyle?: object,
  iconStyle?: object,
};

type IconProps = {
  iconStyle?: object,
  size?: number, 
}

const icons = {
  location: ({iconStyle, size}: IconProps) => <Ionicons name="location-sharp" size={size} style={[styles.icon, iconStyle]} />,
  megaphone: ({iconStyle, size}: IconProps) => <Entypo name="megaphone" size={size} style={[styles.icon, iconStyle]} />,
  menu: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, iconStyle]} />,
  notifications: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, iconStyle]} />,
  plus: ({iconStyle, size}: IconProps) => <Ionicons name="add" size={size} style={[styles.icon, iconStyle]} />,
  save: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, iconStyle]} />,
  search: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, iconStyle]} />,
  share: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, iconStyle]} />,
  twitter: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, iconStyle]} />,
  user: ({iconStyle, size}: IconProps) => <Ionicons name="person-circle" size={size} style={[styles.icon, iconStyle]} />,
  users: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, iconStyle]} />,
  actions: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, iconStyle]} />,
  copy: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, iconStyle]} />,
  email: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, iconStyle]} />,
  facebook: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, iconStyle]} />,
  instagram: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, iconStyle]} />,
  layers: ({iconStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, iconStyle]} />,
};

const StaticIcon = ({name, size, containerStyle, iconStyle}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {icons[name]({iconStyle, size})}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  icon: {
    
  },
});

export default StaticIcon;