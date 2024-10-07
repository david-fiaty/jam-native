import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GlobalStyles } from '@/constants/GlobalStyles';

const AsteriskIcon = () => {
  return (
    <View style={styles.container}>        
      <MaterialCommunityIcons name="asterisk" size={16} color={GlobalStyles.icon.color} />
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

export default AsteriskIcon;