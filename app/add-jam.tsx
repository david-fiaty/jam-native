import FooterBar from '@/components/navigation/FooterBar';
import ViewportContainer from '@/components/base/ViewportContainer';
import AddJamScreen from '@/components/screens/AddJamScreen';

const AddJam = () => {
  return (  
    <ViewportContainer>
      <AddJamScreen />
      <FooterBar />
    </ViewportContainer>
  );
};

export default AddJam;
