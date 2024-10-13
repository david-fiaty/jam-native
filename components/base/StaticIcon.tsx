import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  name?: string,
  containerStyle?: object,
  iconStyle?: object,
};

const icons = {
  location: (iconStyle) => <Ionicons name="location" size={50} style={[styles.icon, iconStyle]} />,
  megaphone: () => {},
  menu: () => {},
  notifications: () => {},
  plus: () => {},
  save: () => {},
  search: () => {},
  share: () => {},
  twitter: () => {},
  user: () => {},
  users: () => {},
  actions: () => {},
  copy: () => {},
  email: () => {},
  facebook: () => {},
  instagram: () => {},
  layers: () => {},
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