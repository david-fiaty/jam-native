import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  size?: number
};

const TwitterIcon({size}: Props) {
  size = size ? size : GlobalStyles.icon.size;
  
  return (
    <MaterialCommunityIcons name="twitter" size={size} style={styles.icon} />   
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

export default TwitterIcon;