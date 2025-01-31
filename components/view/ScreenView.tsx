import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BaseProps } from '@/constants/Types';
import HeaderNavigation from '../navigation/HeaderNavigation';
import FooterNavigation from '../navigation/FooterNavigation';

const ScreenView = ({style, children}: BaseProps) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <HeaderNavigation />
      {children}
      <FooterNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});

export default ScreenView;