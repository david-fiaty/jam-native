import TopToolbar from '@/components/navigation/TopToolbar';
import BottomTabs from '@/components/navigation/BottomTabs';
import JamsScreen from '@/components/screens/JamsScreen';
import ViewportContainer from '@/components/base/ViewportContainer';

const Jams = () => {
  return (  
    <ViewportContainer>
      <TopToolbar /> 
      <JamsScreen />
      <BottomTabs />
    </ViewportContainer>
  );
};

export default Jams;
