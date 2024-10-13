import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  name?: string,
  containerStyle?: object,
  iconStyle?: object,
};

type IconStyle = {
  itemStyle: object, 
}

const icons = {
  location: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  megaphone: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  menu: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  notifications: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  plus: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  save: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  search: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  share: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  twitter: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  user: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  users: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  actions: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  copy: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  email: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  facebook: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  instagram: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
  layers: (itemStyle: IconStyle) => <Ionicons name="location" size={50} style={[styles.icon, itemStyle]} />,
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