import { useRouter } from 'expo-router';
import TopToolbar from '@/components/navigation/TopToolbar';
import BackButton from '@/components/navigation/BackButton';
import ProfileScreen from '@/components/screens/ProfileScreen';
import ViewportContainer from '@/components/base/ViewportContainer';

const Account = () => {
  const router = useRouter();

  return (
    <ViewportContainer>
      <TopToolbar />
      <BackButton title="Account information" onPress={() => router.replace('/jams')} />
      <ProfileScreen />
    </ViewportContainer>
  );
};

export default Account;