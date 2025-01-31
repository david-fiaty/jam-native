import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Layout } from '@/constants/Layout';
import { Colors } from "@/constants/Colors";
import { setIsSearching } from "@/redux/slices/SearchSlice";
import SearchManager from "@/manager/SearchManager";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import LogoView from '../view/LogoView';
import ScreenManager from "@/manager/ScreenManager";
import UserManager from '@/manager/UserManager';
import ModalButton from "../button/ModalButton";
import i18n from "@/translation/i18n";
import SearchField from "../field/SearchField";
import RouteConfig from "@/constants/RouteConfig";
import ModalConfig from "@/constants/ModalConfig";

const headerSize: any = ScreenManager.getHeaderSize();

const HeaderNavigation = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeModal: any = ScreenManager.getActiveModal();
  const isLoggedIn: boolean = UserManager.isLoggedIn();
  const currentRouteConfig: any = RouteConfig.getRoutes().find((o: any) => o.name == route.name);
  const currentModalConfig: any = ModalConfig.build().find((o: any) => o.name == activeModal?.name);
  const containerStyle: any = ScreenManager.getHeaderSize();

  const getIconTheme = (screenName: string) => {
    return activeModal?.name == screenName ? 'primary' : 'secondary';
  };

  const canShowHeader = () => {
    return currentModalConfig?.showHeader == true || currentRouteConfig?.showHeader == true;
  };

  const canShowButtons = () => {
    return currentModalConfig?.showHeaderButtons == true || currentRouteConfig?.showHeaderButtons == true;
  };

  const canShowSearch = () => {
    return currentModalConfig?.showHeaderSearch == true || currentRouteConfig?.showHeaderSearch == true;
  };

  const renderNotificationsButton = () => {
    return (
      <ModalButton 
        login={true}
        name="NotificationsMenu"
        backTitle={i18n.t('Notifications')}
        trigger={    
          <IconView 
            label={notificationsCount > 0 ? ` ${notificationsCount}+` : ` 0 `} 
            size={13}
            padding={4.5}  
            theme={getIconTheme('NotificationsMenu')} 
          />
        }
      />
    );
  };

  const renderSettingsButton = () => {
    return (
      <ModalButton 
        login={true}
        name="SettingsMenu"
        backTitle={i18n.t('Settings')}
        trigger={
          <IconView 
            name="menu"
            size={14}
            padding={6} 
            theme={getIconTheme('SettingsMenu')} 
          />
        }
      />
    );
  };

  const renderLogo = () => {
    return (
      <TouchableOpacity onPress={() => ScreenManager.toggleModal(null)}>
        <LogoView size={Layout.logo.size} />
      </TouchableOpacity>
    );
  };

  const renderSearchField = () => {
    return (
      <SearchField 
        canShow={canShowSearch()}
        onSearchEdit={onSearchEdit}
        onSearchSubmit={onSearchSubmit} 
        onSearchClear={onSearchClear} 
      />
    );
  };

  const loadSearchResult = async (value?: any) => {
    await SearchManager.getSearchResult(value);
  };

  const onSearchEdit = async (value: any) => {
    await loadSearchResult(value);
  };

  const onSearchSubmit = async (value: any) => {
    dispatch(setIsSearching(true));
    await loadSearchResult(value);
    dispatch(setIsSearching(false));
  };

  const onSearchClear = async () => {
    dispatch(setIsSearching(true));
    await SearchManager.clearSearch();
    dispatch(setIsSearching(false));
  };

  useEffect(() => {
    (async () => {
      await loadSearchResult();
      setNotificationsCount(await UserManager.getNotifications());
      setIsLoaded(true);
    })();
  }, [isLoaded]);

  if (!canShowHeader()) return <></>;

  return (
    <BoxView 
      direction="row" 
      align="center" 
      justify="space-between"
      style={[styles.container, containerStyle]}
    >
      <BoxView direction="row" align="center" style={styles.headerLeft}>
        {renderLogo()}
      </BoxView>

      { canShowButtons() &&
        <BoxView direction="row" align="center" justify="flex-end" style={styles.headerRight}>
          {renderSearchField()}
          {isLoggedIn && renderNotificationsButton()}
          {isLoggedIn && renderSettingsButton()}
        </BoxView>
      }
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: headerSize.width,
    paddingHorizontal: Layout.space.base*1.5,
  },
  headerLeft: {
    width: '12%',
  },
  headerRight: {
    width: 200,
  },
});

export default HeaderNavigation;
