import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  name?: string,
  containerStyle?: object,
  labelStyle?: object,
};

const icons = {
  location: () => <Ionicons name="location" size={50} style={styles.icon} />,
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

export function StaticIcon({name, containerStyle, labelStyle}: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      {icons[name]()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  icon: {
    
  },
});