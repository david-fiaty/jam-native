import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  size?: number,
};

export function AddMediaButton({size}: Props) {
  size = size ? size : GlobalStyles.icon.fontSize;
  
  return (
    <View style={styles.container}>
      <Ionicons name="add" size={size} style={styles.icon} />   
      <Text style={GlobalStyles.text}>Add media</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: GlobalStyles.gap,
    marginBottom: GlobalStyles.gap,
  },
  icon: {
    ...GlobalStyles.icon,
    ...{
      backgroundColor: Colors.tertiary,
      borderColor: Colors.tertiary,
      borderWidth: 1,
      borderRadius: 4,
    },
  },
});

export default AddMediaButton;