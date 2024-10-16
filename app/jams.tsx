import HeaderBar from '@/components/navigation/HeaderBar';
import FooterBar from '@/components/navigation/FooterBar';
import JamsScreen from '@/components/screens/JamsScreen';
import ViewportContainer from '@/components/base/ViewportContainer';

const Jams = () => {
  return (  
    <ViewportContainer>
      <HeaderBar /> 
      <JamsScreen />
      <FooterBar />
    </ViewportContainer>
  );
};

export default Jams;
