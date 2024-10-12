import { StyleSheet, View, Text } from 'react-native';

type Props = {
  name: string,
  containerStyle?: object,
  labelStyle?: object,
};

const icons = {
  location: () => {},
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
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  icon: {
    
  },
});
