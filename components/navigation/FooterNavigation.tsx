import React, { StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import ScreenManager from '@/manager/ScreenManager';
import ModalButton from "../button/ModalButton";
import i18n from '@/translation/i18n';
import ModalConfig from "@/constants/ModalConfig";
import RouteConfig from "@/constants/RouteConfig";

const containerStyle = ScreenManager.getFooterSize();
const containerPosition = ScreenManager.getFooterPosition();

const FooterNavigation = () => {
  const route = useRoute();
  const activeModal: any = ScreenManager.getActiveModal();
  const currentRouteConfig: any = RouteConfig.getRoutes().find((o: any) => o.name == route.name);
  const currentModalConfig: any = ModalConfig.build().find((o: any) => o.name == activeModal?.name);

  const getIconTheme = (screenName: string) => {
    return activeModal?.name == screenName ? 'secondary' : 'clear';
  };

  const canShowFooter = () => {
    return currentModalConfig?.showFooter === true || currentRouteConfig?.showFooter === true;
  };

  if (!canShowFooter()) return <></>;

  return (
    <BoxView 
      direction="row" 
      align="center" 
      justify="space-between" 
      style={[styles.container, containerStyle]}
    >
      <ModalButton 
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

      <ModalButton 
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

      <ModalButton 
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
    paddingHorizontal: Layout.space.base*6,
  },
});

export default FooterNavigation;
