import { StyleSheet, TouchableOpacity } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  size?: number
};

export function LayersIcon({size}: Props) {
  size = size ? size : GlobalStyles.icon.fontSize;
  
  return (
    <TouchableOpacity>
      <SimpleLineIcons name="layers" size={size} style={styles.icon} />   
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

export default LayersIcon;