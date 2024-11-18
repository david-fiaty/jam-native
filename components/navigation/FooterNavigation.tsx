import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Colors } from "@/constants/Colors";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import ScreenManager from '@/classes/ScreenManager';
import UserManager from '@/classes/UserManager';

const FooterNavigation = () => {
  const router = useRouter();
  const activeScreen = ScreenManager.getActiveScreen();
  const isLoggedIn = UserManager.isLoggedIn();

  return (
    <BoxView direction="row" align="center" justify="space-around" style={Layout.footer}>
      <IconView
        name="location"
        radius="round"
        theme={activeScreen?.name == 'MapView' ? 'secondary' : 'clear'}
        onPress={() => ScreenManager.toggleModal({
          name: 'MapView',
        })}
      />
      <IconView
        name="plus"
        radius="round"
        theme={activeScreen?.name == 'AddJamForm' ? 'secondary' : 'clear'}
        style={activeScreen?.name == 'AddJamForm' ? styles.active : {}}
        onPress={() => ScreenManager.toggleModal({
          name: 'AddJamForm',
        })}
      />
      <IconView
        name="user"
        radius="round"
        theme={activeScreen?.name == 'ProfileForm' ? 'secondary' : 'clear'}
        onPress={() => isLoggedIn ? ScreenManager.toggleModal({ name: 'ProfileForm' }) : router.push('/login')}
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
