import { StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  size?: number
};

const EmailIcon = ({size}: Props) => {
  size = size ? size : GlobalStyles.icon.size;
  
  return (
    <MaterialIcons name="email" size={size} style={styles.icon} />   
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

export default EmailIcon;