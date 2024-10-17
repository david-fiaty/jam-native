import FooterBar from '@/components/navigation/FooterBar';
import ViewportContainer from '@/components/base/ViewportContainer';
import MapScreen from '@/components/screens/MapScreen';

const Map = () => {
  return (  
    <ViewportContainer>
      <MapScreen />
      <FooterBar />
    </ViewportContainer>
  );
};

export default Map;
