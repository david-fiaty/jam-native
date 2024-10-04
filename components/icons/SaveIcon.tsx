import { StyleSheet, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalStyles } from '@/constants/GlobalStyles';

const SaveIcon = () => {
  return (
    <View>        
      <AntDesign name="arrowdown" size={24} color={GlobalStyles.icon.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: GlobalStyles.text,
});

export default SaveIcon;