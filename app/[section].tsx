import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import BoxView from '@/components/view/BoxView';
import TextView from '@/components/view/TextView';
import WelcomeSection from '@/components/section/WelcomeSection';

type Props = {
  name?: any;
};

export default ({ name }: Props) => {
  return (
    <TextView>dynamic section</TextView>
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
