import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import ScreenManager from '@/manager/ScreenManager';
import ModalView from "../view/ModalView";
import JamsMapView from "../view/JamsMapView";
import i18n from "@/translation/i18n";
import JamForm from "../form/JamForm";
import ProfileForm from "../form/ProfileForm";
import DeviceManager from "@/manager/DeviceManager";

const containerStyle = ScreenManager.getFooterSize();
const containerPosition = ScreenManager.getFooterPosition();
const activeModal = ScreenManager.getActiveModal();

const FooterNavigation = () => {
  return (
    <BoxView 
      direction="row" 
      align="center" 
      justify="center" 
      style={[styles.container, containerStyle]}
    >
      <ModalView 
        login={false}
        content={<JamsMapView />}
        backTitle={i18n.t('Jam locations')}
        triggerAlignSelf="center"
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
        triggerAlignSelf="center"
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
        triggerAlignSelf="center"
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
    width: '100%',
    borderTopWidth: 0.3,
    borderTopColor: Colors.primary,
    //backgroundColor: Colors.white,
    backgroundColor: 'yellow',
    //height: '100%',
    position: 'absolute',
    top: containerPosition.y,
  },
  active: {
    backgroundColor: Colors.secondary,
  },
});

export default FooterNavigation;
