import { StyleSheet, View } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';

const SearchIcon = () => {
  return (
    <View style={styles.container}>        
      <SimpleLineIcons name="magnifier" size={14} color={GlobalStyles.icon.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
    borderRadius: 40,
    padding: 6,
  },
});

export default SearchIcon;