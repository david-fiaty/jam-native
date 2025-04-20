import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import StaticData from '@/constants/StaticData';

const LegalSection = () => {
  const router = useRouter();

  return (
    <BoxView direction="column" align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <TextView>{StaticData.legal.content}</TextView>
    </BoxView>
  );
};

export default LegalSection;
