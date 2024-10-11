import { StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  size?: number,
};

export function UserIcon({size}: Props) {
  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle" size={size} style={styles.icon} />   
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
    ...{
      backgroundColor: Colors.secondary,
      padding: 6,
      borderRadius: 40,
    },
  },
});

export default UserIcon;