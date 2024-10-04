import { StyleSheet, View, Text } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GlobalStyles } from '@/constants/GlobalStyles';

const JammersIcon = () => {
  return (
    <View style={styles.container}>        
      <MaterialCommunityIcons name="asterisk" size={18} color={GlobalStyles.icon.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 35,
    width: 35,
    height: 35,
    backgroundColor: GlobalStyles.icon.backgroundColor,
  },
});

export default JammersIcon;