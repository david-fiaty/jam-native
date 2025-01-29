import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import ScreenManager from '@/manager/ScreenManager';
import ModalView from "../view/ModalView";
import i18n from '@/translation/i18n';

const containerStyle = ScreenManager.getFooterSize();
const containerPosition = ScreenManager.getFooterPosition();

const FooterNavigation = () => {
  const activeModal: any = ScreenManager.getActiveModal();

  const getIconTheme = (screenName: string) => {
    return activeModal?.name == screenName ? 'secondary' : 'clear';
  };

  return (
    <BoxView 
      direction="row" 
      align="center" 
      justify="center" 
      style={[styles.container, containerStyle]}
    >
      <ModalView 
        login={false}
        name="JamsMapView"
        trigger={
          <IconView
            name="location"
            radius="round"
            size={16}
            padding={4}
            theme={getIconTheme("JamsMapView")}
          />
        }
      />

      <ModalView 
        login={true}
        name="JamForm"
        backTitle={i18n.t('Create a Jam')}
        trigger={
          <IconView
            name="plus"
            radius="round"
            size={16}
            padding={4}
            theme={getIconTheme("JamForm")}
          />
        }
      />

      <ModalView 
        login={true}
        name="SearchView"
        trigger={
          <IconView
            name="search"
            radius="round"
            size={16}
            padding={4}
            theme={getIconTheme("SearchView")}
          />
        }
      />

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: Layout.borderWidth.base,
    borderTopColor: Colors.primary,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: containerPosition.y,
  },
});

export default FooterNavigation;
