import { View, StyleSheet } from 'react-native';
import Slideshow from '@/components/slideshow/Slideshow';
import BottomLinks from '@/components/navigation/BottomLinks';
import LoginSignupButton from '../button/LoginSignupButton';
import LogoView from '../view/LogoView';
import BoxView from '../view/BoxView';
import { Divider } from '@rneui/base';
import WelcomeSlideshow from '../welcome-slideshow/WelcomeSlideshow';


import { Dimensions, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';


const WelcomeScreen = () => {

  const width = Dimensions.get('window').width;
  
  return (
    <BoxView direction="column" align="center" justify="center" style={styles.container}>
      <LogoView size={{ width: 110, height: 110 }} />    


      <View  style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            />
        </View>
      
      <Divider />
      <WelcomeSlideshow />

      <Divider />
      <LoginSignupButton />
      
      <Divider />
      <BottomLinks />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default WelcomeScreen;