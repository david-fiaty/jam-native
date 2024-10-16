import HeaderBar from '@/components/navigation/HeaderBar';
import AboutScreen from '@/components/screens/AboutScreen';
import ViewportContainer from '@/components/base/ViewportContainer';

const About = () => {
  return (
    <ViewportContainer>
      <HeaderBar />
      <AboutScreen />
    </ViewportContainer>
  );
};

export default About;