import { StyleSheet } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import BaseTheme from "@/constants/BaseTheme";
import BoxView from '@/components/view/BoxView';
import TextView from '@/components/view/TextView';
import WelcomeSection from '@/components/section/WelcomeSection';
import LoginSection from '@/components/section/LoginSection';
import AboutSection from '@/components/section/AboutSection';
import LegalSection from '@/components/section/LegalSection';
import JamsSection from '@/components/section/JamsSection';

export default () => {
  const { section } = useGlobalSearchParams();

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

  const renderSection = () => {
    return sections.find((o: any) => o.name === (section || 'welcome'))?.render();
  };

  return (
    <ThemeProvider theme={BaseTheme}>
      <SafeAreaView style={styles.container}>
        <TextView>header</TextView>
        <BoxView 
          direction="column" 
          align="center" 
          justify="center" 
          style={styles.container}
        >
          {renderSection()}
        </BoxView>
        <TextView>footer</TextView>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: Colors.white,
  },
});

