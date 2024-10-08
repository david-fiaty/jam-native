import { StyleSheet, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalStyles } from '@/constants/GlobalStyles';

const SaveIcon = () => {
  return (
    <View style={styles.container}>       
      <AntDesign name="arrowdown" size={16} color={GlobalStyles.icon.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 40,
    padding: 5,
    backgroundColor: GlobalStyles.icon.backgroundColor,
  },
});

export default SaveIcon;