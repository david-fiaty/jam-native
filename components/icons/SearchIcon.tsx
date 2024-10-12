import { StyleSheet, View } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  size?: number,
};

const SearchIcon({size}: Props) {
  size = size ? size : GlobalStyles.icon.size;
  
  return (
    <View style={styles.container}>
      <SimpleLineIcons name="magnifier" size={size} style={styles.icon} />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    ...GlobalStyles.icon,
    ...{
      backgroundColor: '#FFFFFF',
      padding: 6,
      borderRadius: 40,
    },
  },
});

export default SearchIcon;