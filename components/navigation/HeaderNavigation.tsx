import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import { Colors } from "@/constants/Colors";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import LogoView from '../view/LogoView';
import ScreenManager from "@/manager/ScreenManager";
import UserManager from '@/manager/UserManager';
import ModalView from "../view/ModalView";
import i18n from "@/translation/i18n";
import SearchField from "../field/SearchField";
import { Config } from "@/constants/Config";

type Props = BaseProps & {
  onSearchSubmit?: (value: any) => void;
  onSearchClear?: () => void;
};

const HeaderNavigation = ({ onSearchSubmit, onSearchClear }: Props) => {
  const route = useRoute();
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeModal: any = ScreenManager.getActiveModal();
  const isLoggedIn: boolean = UserManager.isLoggedIn();
  const containerStyle: any = ScreenManager.getHeaderSize();

  const getIconTheme = (screenName: string) => {
    return activeModal?.name == screenName ? 'primary' : 'secondary';
  };

  const renderSearchField = () => {
    return (
      <SearchField 
        onSearchSubmit={onSearchSubmit} 
        onSearchClear={onSearchClear} 
      />
    );
  };

  const renderNotificationsButton = () => {
    return (
      <ModalView 
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
      <ModalView 
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

  useEffect(() => {
    (async () => {
      setNotificationsCount(await UserManager.getNotifications());
      setIsLoaded(true);
    })();
  }, [isLoaded]);

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

      { (route.name == Config.mainRoute.replace('/', '') || activeModal?.headerNavigation) &&
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
    paddingHorizontal: Layout.space.base*1.5,
  },
  headerLeft: {
    
  },
  headerRight: {
    width: 200,
  },
});

export default HeaderNavigation;
