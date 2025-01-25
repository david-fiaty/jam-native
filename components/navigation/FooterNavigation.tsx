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
  const activeModal = ScreenManager.getActiveModal();
  const isLoggedIn = UserManager.isLoggedIn();

  return (
    <BoxView direction="row" align="center" justify="space-around" style={Layout.footer}>
      <IconView
        name="location"
        radius="round"
        size={14}
        padding={4}
        theme={activeModal?.name == 'JamsMapView' ? 'secondary' : 'clear'}
        onPress={() => ScreenManager.toggleModal('JamsMapView')}
      />
      <IconView
        name="plus"
        radius="round"
        size={14}
        padding={4}
        theme={activeModal?.name == 'JamForm' ? 'secondary' : 'clear'}
        style={activeModal?.name == 'JamForm' ? styles.active : {}}
        onPress={() => isLoggedIn ? ScreenManager.toggleModal('JamForm') : router.push('/login')}
      />
      <IconView
        name="user"
        radius="round"
        size={14}
        padding={4}
        theme={activeModal?.name == 'ProfileForm' ? 'secondary' : 'clear'}
        onPress={() => isLoggedIn ? ScreenManager.toggleModal('ProfileForm') : router.push('/login')}
        style={activeModal?.name == 'ProfileForm' ? styles.active : {}}
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
