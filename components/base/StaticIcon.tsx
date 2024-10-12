import { StyleSheet, View, Text } from 'react-native';

type Props = {
  name: string,
  containerStyle?: object,
  labelStyle?: object,
};

const Location = () => {};
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
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  icon: {
    
  },
});
