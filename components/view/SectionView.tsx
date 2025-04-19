import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import TextView from './TextView';
import WelcomeSection from '../section/WelcomeSection';
import LoginSection from '../section/LoginSection';
import AboutSection from '../section/AboutSection';
import LegalSection from '../section/LegalSection';
import JamsSection from '../section/JamsSection';

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

  return sections.find((o: any) => o.name === (name || 'welcome'))?.render();
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});

export default SectionView;