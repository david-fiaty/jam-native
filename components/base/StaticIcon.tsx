import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  name?: string,
  containerStyle?: object,
  iconStyle?: object,
};

const icons = {
  location: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  megaphone: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  menu: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  notifications: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  plus: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  save: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  search: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  share: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  twitter: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  user: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  users: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  actions: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  copy: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  email: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  facebook: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  instagram: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  layers: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
};

export function StaticIcon({name, containerStyle, iconStyle}: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      {icons[name](iconStyle)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  icon: {
    
  },
});