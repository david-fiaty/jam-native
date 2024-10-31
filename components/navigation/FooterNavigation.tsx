import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '@/constants/Layout';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Colors } from "@/constants/Colors";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import ScreenManager from '@/classes/ScreenManager';

const FooterNavigation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const activeScreen = ScreenManager.getActiveScreen();

  return (
    <BoxView direction="row" align="center" justify="space-around" style={Layout.footer}>
      <IconView
        name="location"
        radius="round"
        theme={activeScreen?.name == 'MapView' ? 'secondary' : 'clear'}
        onPress={() => dispatch(setActiveScreen({
          name: 'MapView',
        }))}
      />
      <IconView
        name="plus"
        radius="round"
        theme={activeScreen?.name == 'AddJamForm' ? 'secondary' : 'clear'}
        onPress={() => dispatch(setActiveScreen({
          name: 'AddJamForm',
        }))}
        style={activeScreen?.name == 'AddJamForm' ? styles.active : {}}
      />
      <IconView
        name="user"
        radius="round"
        theme={activeScreen?.name == 'ProfileForm' ? 'secondary' : 'clear'}
        onPress={() => 
          router.push('/login')
          /*dispatch(setActiveScreen({
          name: 'ProfileForm',
        }))*/

          }
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
