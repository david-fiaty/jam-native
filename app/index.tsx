import WelcomeScreen from '@/components/screens/WelcomeScreen';
import ViewportContainer from '@/components/base/ViewportContainer';
import FooterBar from '@/components/navigation/FooterBar';
import JamsScreen from '@/components/screens/JamsScreen';

const Index = () => {
  return (  
    <ViewportContainer>
      <JamsScreen />
      <FooterBar />
    </ViewportContainer>
  );
};

export default Index;