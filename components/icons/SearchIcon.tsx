import { StyleSheet, View } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  size?: number,
};

export function MenuIcon({size}: Props) {
  return (
    <View style={styles.container}>
      <SimpleLineIcons name="menu" size={size} style={styles.icon} />   
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
      backgroundColor: Colors.tertiary,
      padding: 6,
      borderRadius: 40,
    },
  },
});

export default MenuIcon;