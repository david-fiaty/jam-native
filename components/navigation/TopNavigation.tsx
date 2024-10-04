import { View, StyleSheet } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { SvgImage } from '@/components/SvgImage';

const TopNavigation = () => {
  return (
    <View style={styles.container}>
      <SvgImage uri={require('@/assets/images/jam-logo.png')} width={45} height={45} />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
});

export default TopNavigation;