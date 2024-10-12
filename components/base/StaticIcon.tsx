import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  name?: string,
  containerStyle?: object,
  labelStyle?: object,
};

const Location = () => <Ionicons name="location" size={50} style={styles.icon} />;
const Megaphone = () => {};
const Menu = () => {};
const Notifications = () => {};
const Plus = () => {};
const Save = () => {};
const Search = () => {};
const Share = () => {};
const Twitter = () => {};
const User = () => {};
const Users = () => {};
const Actions = () => {};
const Copy = () => {};
const Email = () => {};
const Facebook = () => {};
const Instagram = () => {};
const Layers = () => {};

export function StaticIcon({name, containerStyle, labelStyle}: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Location />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  icon: {
    
  },
});