import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  size?: number,
};

export function CopyIcon({size}: Props) {
  size = size ? size : GlobalStyles.icon.fontSize;
  
  return (
    <TouchableOpacity>
      <MaterialIcons name="content-copy" size={size} style={styles.icon} />  
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

export default CopyIcon;