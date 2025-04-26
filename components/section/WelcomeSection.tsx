import { Divider } from '@rneui/base';
import LoginSignupButton from '../button/LoginSignupButton';
import LogoView from '../view/LogoView';
import TextSlideshow from '../slideshow/TextSlideshow';
import StaticData from '@/constants/StaticData';
import BottomLinks from './navigation/BottomLinks';

const WelcomeSection = () => {
  return (
    <>
      <LogoView size={110} />

      <TextSlideshow data={StaticData.welcomeSlideshow} />

      <Divider />
      <LoginSignupButton />

      <Divider /><Divider />
      <BottomLinks />
    </>
  );
};

export default WelcomeSection;