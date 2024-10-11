import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  size?: number
};

export function FacebookIcon({size}: Props) {
  size = size ? size : GlobalStyles.icon.fontSize;
  
  return (
    <TouchableOpacity>
      <MaterialCommunityIcons name="facebook" size={size} style={styles.icon} />
    </TouchableOpacity>   
  );
};

const styles = StyleSheet.create({
  icon: {
    ...GlobalStyles.icon,
    ...{
      backgroundColor: Colors.secondary,
      padding: 6,
      borderRadius: 40,
    },
  },
});

export default FacebookIcon;