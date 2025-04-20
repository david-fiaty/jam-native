import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import TextView from './TextView';
import WelcomeSection from '../section/WelcomeSection';
import LoginSection from '../section/LoginSection';
import AboutSection from '../section/AboutSection';
import LegalSection from '../section/LegalSection';
import JamsSection from '../section/JamsSection';
import BoxView from './BoxView';
import SectionHeader from '../section/navigation/SectionHeader';
import SectionFooter from '../section/navigation/SectionFooter';
import SectionModal from '../section/modal/SectionModal';

type Props = {
  name?: any;
};

const SectionView = ({ name }: Props) => {
  const sections: any = [
    {
      name: 'welcome',
      header: false,
      footer: false,
      render: () => <WelcomeSection />,
    },
    {
      name: 'login',
      header: false,
      footer: false,
      render: () => <LoginSection />,
    },
    {
      name: 'about',
      header: true,
      footer: false,
      render: () => <AboutSection />,
    },
    {
      name: 'legal',
      header: true,
      footer: false,
      render: () => <LegalSection />,
    },
    {
      name: 'jams',
      header: true,
      footer: true,
      render: () => <JamsSection />,
    },
  ];

  return (
    <>
      <SectionHeader />
      <BoxView
        direction="column"
        align="center"
        justify="center"
        style={styles.container}
      >
        {sections.find((o: any) => o.name === (name || 'welcome'))?.render()}

        <SectionModal />
      </BoxView>
      <SectionFooter />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default SectionView;