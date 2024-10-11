import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  count: number,
  size?: number,
};

export function NotificationsIcon({count, size}: Props) {
  size = size ? size : GlobalStyles.icon.fontSize;

  return (
    <View style={styles.container}>
      <Text style={[styles.icon, {fontSize: size}]}>{count}+</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    ...GlobalStyles.icon,
    ...GlobalStyles.text,
    ...{
      backgroundColor: Colors.tertiary,
      paddingTop: 5.5,
      paddingRight: 8,
      paddingBottom: 5.5,
      paddingLeft: 8,
      borderRadius: 40,
    },
  },
});

export default NotificationsIcon;