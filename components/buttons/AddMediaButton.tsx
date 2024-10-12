import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import TextBlock from '../base/TextBlock';

type Props = {
  size?: number,
};

const AddMediaButton = ({size}: Props) => {
  size = size ? size : GlobalStyles.icon.size;
  
  return (
    <View style={styles.container}>
      <Ionicons name="add" size={size} style={styles.icon} />   
      <TextBlock>Add media</TextBlock>
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