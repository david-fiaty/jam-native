import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { BaseProps } from '@/constants/Types';
import BoxView from '@/components/view/BoxView';
import TextView from './TextView';

type Props = {
  name?: any;
  style?: any;
  children?: any;
};

const SectionView = ({ name, style, children }: Props) => {
  return (
    <TextView>SectionView</TextView>
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

export default SectionView;