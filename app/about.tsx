import TopToolbar from '@/components/navigation/TopToolbar';
import AboutScreen from '@/components/screens/AboutScreen';
import ViewportContainer from '@/components/base/ViewportContainer';

const About = () => {
  return (
    <ViewportContainer>
      <TopToolbar />
      <AboutScreen />
    </ViewportContainer>
  );
};

export default About;