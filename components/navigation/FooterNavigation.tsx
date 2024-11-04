import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '@/constants/Layout';
import { setActiveModal } from "@/redux/slices/ScreenSlice";
import { Colors } from "@/constants/Colors";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import ScreenManager from '@/classes/ScreenManager';
import UserManager from '@/classes/UserManager';

const FooterNavigation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const activeScreen = ScreenManager.getActiveModal();
  const isLoggedIn = UserManager.isLoggedIn();

  return (
    <BoxView direction="row" align="center" justify="space-around" style={Layout.footer}>
      <IconView
        name="location"
        radius="round"
        theme={activeScreen?.name == 'MapView' ? 'secondary' : 'clear'}
        onPress={() => dispatch(setActiveModal({
          name: 'MapView',
        }))}
      />
      <IconView
        name="plus"
        radius="round"
        theme={activeScreen?.name == 'AddJamForm' ? 'secondary' : 'clear'}
        style={activeScreen?.name == 'AddJamForm' ? styles.active : {}}
        onPress={() => dispatch(setActiveModal({
          name: 'AddJamForm',
        }))}
      />
      <IconView
        name="user"
        radius="round"
        theme={activeScreen?.name == 'ProfileForm' ? 'secondary' : 'clear'}
        onPress={() => isLoggedIn ? dispatch(setActiveModal({ name: 'ProfileForm' })) : router.push('/login')}
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
