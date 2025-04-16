import BottomLinks from '@/components/navigation/BottomLinks';
import LoginSignupButton from '../button/LoginSignupButton';
import LogoView from '../view/LogoView';
import { Divider } from '@rneui/base';
import TextSlideshow from '../slideshow/TextSlideshow';
import StaticData from '@/constants/StaticData';

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