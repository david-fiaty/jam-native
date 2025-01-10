import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Colors } from "@/constants/Colors";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import ScreenManager from '@/manager/ScreenManager';
import UserManager from '@/manager/UserManager';

const FooterNavigation = () => {
  const router = useRouter();
  const activeScreen = ScreenManager.getActiveScreen();
  const isLoggedIn = UserManager.isLoggedIn();

  return (
    <BoxView direction="row" align="center" justify="space-around" style={Layout.footer}>
      <IconView
        name="location"
        radius="round"
        size={16}
        padding={4}
        theme={activeScreen?.name == 'JamsMapView' ? 'secondary' : 'clear'}
        onPress={() => ScreenManager.toggleScreen('JamsMapView')}
      />
      <IconView
        name="plus"
        radius="round"
        size={14}
        padding={5}
        theme={activeScreen?.name == 'AddJamForm' ? 'secondary' : 'clear'}
        style={activeScreen?.name == 'AddJamForm' ? styles.active : {}}
        onPress={() => ScreenManager.toggleScreen('AddJamForm')}
      />
      <IconView
        name="user"
        radius="round"
        size={14}
        padding={5}
        theme={activeScreen?.name == 'ProfileForm' ? 'secondary' : 'clear'}
        onPress={() => isLoggedIn ? ScreenManager.toggleScreen('ProfileForm') : router.push('/login')}
        style={activeScreen?.name == 'ProfileForm' ? styles.active : {}}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: Colors.secondary,
  },
});

export default FooterNavigation;
