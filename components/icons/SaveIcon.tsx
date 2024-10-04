import { StyleSheet, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalStyles } from '@/constants/GlobalStyles';

const SaveIcon = () => {
  return (
    <View style={styles.container}>       
      <AntDesign name="arrowdown" size={24} color={GlobalStyles.icon.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.icon.backgroundColor,
    borderRadius: 35,
    width: 35,
    height: 35,
  },
});

export default SaveIcon;