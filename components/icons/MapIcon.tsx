import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  size?: number,
};

const MapIcon = ({size}: Props) => {
  size = size ? size : GlobalStyles.icon.size;
  
  return (
    <View style={styles.container}>
      <Ionicons name="location" size={size} style={styles.icon} />   
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
      backgroundColor: '#FFFFFF',
    },
  },
});

export default MapIcon;