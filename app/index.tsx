import { useGlobalSearchParams } from 'expo-router';
import { ThemeProvider } from '@rneui/themed';
import BaseTheme from "@/constants/BaseTheme";
import SectionView from '@/components/view/SectionView';
import { View, StyleSheet } from 'react-native';
import BottomLinks from '@/components/navigation/BottomLinks';
import LoginSignupButton from '@/components/button/LoginSignupButton';
import LogoView from '@/components/view/LogoView';
import BoxView from '@/components/view/BoxView';
import { Divider } from '@rneui/base';
import TextSlideshow from '@/components/slideshow/TextSlideshow';

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

export default () => {
  const { section } = useGlobalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <BoxView direction="column" align="center" justify="center" style={styles.container}>
        <LogoView size={110} />    
      
        <TextSlideshow data={textSlideshowData} />

        <Divider />
        <LoginSignupButton />
        
        <Divider /><Divider />
        <BottomLinks />
      </BoxView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

