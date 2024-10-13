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
  itemStyle?: object,
  size?: number, 
}

const icons = {
  location: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  megaphone: ({itemStyle, size}: IconProps) => <Entypo name="megaphone" size={size} style={[styles.icon, itemStyle]} />,
  menu: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  notifications: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  plus: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  save: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  search: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  share: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  twitter: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  user: ({itemStyle, size}: IconProps) => <FontAwesome name="user-circle" size={size} style={[styles.icon, itemStyle]} />,
  users: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  actions: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  copy: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  email: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  facebook: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  instagram: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
  layers: ({itemStyle, size}: IconProps) => <Ionicons name="location" size={size} style={[styles.icon, itemStyle]} />,
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