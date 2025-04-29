import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import BottomLinks from './navigation/BottomLinks';

const PrivacySection = () => {
  const router = useRouter();

  return (
    <BoxView direction="column" align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <TextView>xxx</TextView>
      <BottomLinks />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
});

export default PrivacySection;
