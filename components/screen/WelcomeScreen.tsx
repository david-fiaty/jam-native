import { View, StyleSheet } from 'react-native';
import Slideshow from '@/components/slideshow/Slideshow';
import BottomLinks from '@/components/navigation/BottomLinks';
import LoginSignupButton from '../button/LoginSignupButton';
import LogoView from '../view/LogoView';
import BoxView from '../view/BoxView';
import { Divider } from '@rneui/base';
import WelcomeSlideshow from '../welcome-slideshow/WelcomeSlideshow';
import TextSlideshow from '../slideshow/TextSlideshow';

const textSlideshowData = [
  {
    id: 1,
    title: 'Create better, together',
    content: 'Welcome to the Jam app. Jam is a place to explore and experience artists and creatives from different backgrounds in West Africa.',
    link: 'aaa link',
  },
  {
    id: 2,
    title: 'Everything you need',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: 'bbb link',
  },
  {
    id: 3,
    title: 'The place to excel',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    link: 'ccc link',
  },
];

const WelcomeScreen = () => {
  return (
    <BoxView direction="column" align="center" justify="center" style={styles.container}>
      <LogoView size={{ width: 110, height: 110 }} />    
    
      <TextSlideshow data={textSlideshowData} />

      <Divider />
      <LoginSignupButton />
      
      <Divider />
      <BottomLinks />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default WelcomeScreen;