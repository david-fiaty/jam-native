import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Colors } from "@/constants/Colors";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import ScreenManager from '@/manager/ScreenManager';
import UserManager from '@/manager/UserManager';
import ModalView from "../view/ModalView";
import JamsMapView from "../view/JamsMapView";
import i18n from "@/translation/i18n";
import JamForm from "../form/JamForm";
import ProfileForm from "../form/ProfileForm";

const FooterNavigation = () => {
  const router = useRouter();
  const activeModal = ScreenManager.getActiveModal();
  const isLoggedIn = UserManager.isLoggedIn();

  return (
    <BoxView 
      direction="row" 
      align="center" 
      justify="center" 
      style={[Layout.footer, styles.container]}
    >
      <ModalView 
        login={false}
        content={<JamsMapView />}
        backTitle={i18n.t('Jam locations')}
        trigger={
          <IconView
            name="location"
            radius="round"
            size={14}
            padding={4}
            theme={activeModal?.name == 'JamsMapView' ? 'secondary' : 'clear'}
          />
        }
      />

      <ModalView 
        login={true}
        content={<JamForm />}
        backTitle={i18n.t('Create a Jam')}
        trigger={
          <IconView
            name="plus"
            radius="round"
            size={14}
            padding={4}
            theme={activeModal?.name == 'JamForm' ? 'secondary' : 'clear'}
            style={activeModal?.name == 'JamForm' ? styles.active : {}}
          />
        }
      />

      <ModalView 
        login={true}
        content={<ProfileForm />}
        backTitle={i18n.t('Your profile')}
        trigger={
          <IconView
            name="user"
            radius="round"
            size={14}
            padding={4}
            theme={activeModal?.name == 'ProfileForm' ? 'secondary' : 'clear'}
            style={activeModal?.name == 'ProfileForm' ? styles.active : {}}
          />
        }
      />

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  },
  active: {
    backgroundColor: Colors.secondary,
  },
});

export default FooterNavigation;
