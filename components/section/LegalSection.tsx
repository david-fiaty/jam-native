import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import StaticData from '@/constants/StaticData';
import BottomLinks from '../navigation/BottomLinks';

const LegalSection = () => {
  const router = useRouter();

  return (
    <BoxView direction="column" align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <TextView>{StaticData.legal.content}</TextView>
      <BottomLinks />
    </BoxView>
  );
};

export default LegalSection;
