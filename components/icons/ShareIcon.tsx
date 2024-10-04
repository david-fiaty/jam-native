import { StyleSheet, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalStyles } from '@/constants/GlobalStyles';

const ShareIcon = () => {
  return (
    <View style={styles.container}>        
      <AntDesign name="arrowup" size={24} color={GlobalStyles.icon.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 40,
    padding: 10,
    backgroundColor: GlobalStyles.icon.backgroundColor,
  },
});

export default ShareIcon;