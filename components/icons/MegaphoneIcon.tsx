import { StyleSheet, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  size?: number,
};

const MegaphoneIcon = ({size}: Props) => {
  size = size ? size : GlobalStyles.icon.size;
  
  return (
    <View style={styles.container}>
      <Entypo name="megaphone" size={size} style={styles.icon} />   
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

export default MegaphoneIcon;