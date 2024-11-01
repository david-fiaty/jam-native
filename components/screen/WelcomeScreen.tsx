import { StyleSheet, View, TouchableOpacity } from 'react-native';
import LoginSignupButton from "../button/LoginSignupButton";
import LogoView from "../view/LogoView";
import BoxView from "../view/BoxView";
import { Divider } from "@rneui/base";
import TextSlideshow from "../slideshow/TextSlideshow";
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';

const textSlideshowData = [
  {
    id: 1,
    title: "Create better, together",
    content:
      "Welcome to the Jam app. Jam is a place to explore and experience artists and creatives from different backgrounds in West Africa.",
    link: "aaa link",
  },
  {
    id: 2,
    title: "Everything you need",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "bbb link",
  },
  {
    id: 3,
    title: "The place to excel",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    link: "ccc link",
  },
];

const WelcomeScreen = () => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={styles.container}
    >
      <LogoView size={{ width: 110, height: 110 }} />

      <TextSlideshow data={textSlideshowData} />

      <Divider />
      <LoginSignupButton />

      <Divider />
      <Divider />

      <BoxView
        direction="row"
        align="center"
        justify="space-around"
        style={styles.container}
      >
        <TouchableOpacity onPress={() => router.push("/about")}>
          <View style={styles.containerStyle}>
            <TextView style={[styles.buttonStyle, styles.titleStyle]}>
              {i18n.t('About')}
            </TextView>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/legal')}>
          <View style={styles.containerStyle}>
            <TextView style={[styles.buttonStyle, styles.titleStyle]}>
              {i18n.t('Legal')}
            </TextView>
          </View>
        </TouchableOpacity>
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default WelcomeScreen;
