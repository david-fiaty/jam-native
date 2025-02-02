import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BaseProps } from '@/constants/Types';
import HeaderNavigation from '../navigation/HeaderNavigation';
import FooterNavigation from '../navigation/FooterNavigation';
import ModalView from '@/components/view/ModalView';
import MessageView from '@/components/view/MessageView';

const ScreenView = ({style, children}: BaseProps) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <MessageView />
      <HeaderNavigation />
      {children}
      <FooterNavigation />
      <ModalView />
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