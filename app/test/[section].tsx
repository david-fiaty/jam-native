import TextView from '@/components/view/TextView';
import { useGlobalSearchParams } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

export default () => {

  const { section } = useGlobalSearchParams();

  return ( 
    <TextView>test section: {section}</TextView>
  );
}
