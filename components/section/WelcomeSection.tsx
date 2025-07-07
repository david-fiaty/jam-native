import { Divider } from '@rneui/base';
import LoginSignupButton from '../button/LoginSignupButton';
import LogoView from '../view/LogoView';
import TextSlideshow from '../slideshow/TextSlideshow';
import StaticData from '@/constants/StaticData';
import BottomLinks from './navigation/BottomLinks';
import BoxView from '../view/BoxView';

const WelcomeSection = () => {
  return (
    <>
      <LogoView size={110} />

      <BoxView direction="column" align="center" justify="center" style={{ flex: 1, height: '100%' }}>
        <TextSlideshow data={StaticData.welcomeSlideshow} />
      </BoxView>
      <Divider />
      <LoginSignupButton />

      <Divider /><Divider />
      <BottomLinks />
    </>
  );
};

export default WelcomeSection;