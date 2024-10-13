import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  name?: string,
  containerStyle?: object,
  iconStyle?: object,
};

const icons = {
  location: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  megaphone: (iconStyle) => {},
  menu: (iconStyle) => {},
  notifications: (iconStyle) => {},
  plus: (iconStyle) => {},
  save: (iconStyle) => {},
  search: (iconStyle) => {},
  share: (iconStyle) => {},
  twitter: (iconStyle) => {},
  user: (iconStyle) => {},
  users: (iconStyle) => {},
  actions: (iconStyle) => {},
  copy: (iconStyle) => {},
  email: (iconStyle) => {},
  facebook: (iconStyle) => {},
  instagram: (iconStyle) => {},
  layers: (iconStyle) => {},
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