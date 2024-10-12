import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import TextBlock from '@/components/base/TextBlock';

type Props = {
  size?: number,
};

const AddCollaboratorsButton = ({size}: Props) => {
  size = size ? size : GlobalStyles.icon.size;
  
  return (
    <View style={styles.container}>
      <Ionicons name="add" size={size} style={styles.icon} />   
      <TextBlock>Add collaborators</TextBlock>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: GlobalStyles.space,
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

export default AddCollaboratorsButton;