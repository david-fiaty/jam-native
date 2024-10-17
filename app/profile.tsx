import FooterBar from '@/components/navigation/FooterBar';
import ViewportContainer from '@/components/base/ViewportContainer';
import ProfileScreen from '@/components/screens/ProfileScreen';

const Profle = () => {
  return (  
    <ViewportContainer>
      <ProfileScreen />
      <FooterBar />
    </ViewportContainer>
  );
};

export default Profle;
