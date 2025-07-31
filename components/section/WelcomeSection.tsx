import { StyleSheet, View } from 'react-native';
import { Divider } from '@rneui/base';
import LoginSignupButton from '../button/LoginSignupButton';
import LogoView from '../view/LogoView';
import TextSlideshow from '../slideshow/TextSlideshow';
import BottomLinks from './navigation/BottomLinks';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';

const WelcomeSection = () => {
  const slideshowData: any[] = [
    {
      id: 1,
      title: i18n.t('Create better together'),
      content: i18n.t('JAM! is a place to explore and experience creatives from different backgrounds in West Africa.'),
    },
    {
      id: 2,
      title: i18n.t('A Powerful Tool'),
      content: i18n.t('JAM! is a tool for networking, exchange and collaboration between artists, venues, communities and organisations across the Lagos - Abidjan axis.'),
    },
    {
      id: 3,
      title: i18n.t('Experience and Incubate Tomorrow\'s Culture'),
      content: i18n.t('JAM! Is a social network and a map, all rolled up in one - a digital incubator that is constantly updated thanks to you, its members.'),
    },
  ];

  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={styles.container}
    >
      <LogoView size={110} />

      <TextSlideshow data={slideshowData} />

      <LoginSignupButton />

      <Divider /><Divider />
      <BottomLinks />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});


export default WelcomeSection;