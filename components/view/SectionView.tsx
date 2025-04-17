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
      render: () => <WelcomeSection />,
    },
    {
      name: 'login',
      render: () => <LoginSection />,
    },
    {
      name: 'about',
      render: () => <AboutSection />,
    },
    {
      name: 'legal',
      render: () => <LegalSection />,
    },
    {
      name: 'jams',
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