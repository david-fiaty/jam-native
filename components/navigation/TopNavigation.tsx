import { View, StyleSheet } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { SvgImage } from '@/components/SvgImage';

const TopNavigation = () => {
  return (
    <View style={GlobalStyles.logo}>
      <SvgImage uri={require('@/assets/images/jam-logo.png')} />    
    </View>
  );
};

const styles = StyleSheet.create({

});

export default TopNavigation;