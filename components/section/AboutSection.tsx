import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import BottomLinks from './navigation/BottomLinks';

const AboutSection = () => {
  const router = useRouter();

  return (
    <BoxView 
      direction="column" 
      align="flex-start" 
      justify="flex-start" 
      style={styles.container}
      scroll={true}
    >
      <TextView style={styles.title}>Create more, Together.</TextView>
      <TextView>
        JAM! is a project by Mitsio Motu, the Institut Francais and Sixteen Sixteen Club. It is created to drive a new community of creatives to make a better world for themselves by connecting and creating together.
      </TextView>

      <TextView style={styles.title}>About Mitsio Motu</TextView>
      <TextView>
        Mitsio Motu (MM) , established in 2018, is an innovative company dedicated to designing and developing impactful projects and platforms in emerging economies. We operate a unique model, which involves simultaneously keeping in touch with field reality, processing complex data, developing tailor-made digital solutions and maintaining rich interactions with stakeholders from a variety of worlds.
      </TextView>
      
      <TextView style={styles.title}>About IFT</TextView>
      <TextView>
        The Institut Francais is an independent French body that promotes culture and enterprise around the world. IFT’s mission is to build a better world by encouraging creative community development.
      </TextView>
      
      <TextView style={styles.title}>About Sixteen Sixteen Club</TextView>
      <TextView>
        Sixteen Sixteen Club focuses on education, empowerment, and integration into various business sectors. The organisation uses creative models across three main areas: development, creative incubation and space management, and community building.
      </TextView>

      <BottomLinks />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginTop: Layout.space.base,
  },
});

export default AboutSection;
