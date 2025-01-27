import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { BaseProps } from '@/constants/Types';
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import LogoView from '../view/LogoView';
import ScreenManager from "@/manager/ScreenManager";
import UserManager from '@/manager/UserManager';
import ModalView from "../view/ModalView";
import i18n from "@/translation/i18n";
import SettingsMenu from "../menu/SettingsMenu";
import NotificationsMenu from "../menu/NotificationsMenu";
import SearchView from "../view/SearchView";
import SearchField from "../field/SearchField";

type Props = BaseProps & {
  searchResult?: any;
  onSearchSubmit?: () => void;
};

const HeaderNavigation = ({ searchResult, onSearchSubmit }: Props) => {
  const route = useRoute();
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeModal = ScreenManager.getActiveModal();
  const isLoggedIn = UserManager.isLoggedIn();
  const containerStyle = ScreenManager.getHeaderSize();

  const renderSearchButton = () => {
    return (
      <ModalView 
        login={false}
        content={<SearchView />}
        backTitle={<SearchField onSearchSubmit={onSearchSubmit} />}
        triggerAlignSelf="flex-end"
        trigger={    
          <IconView 
            name="search" 
            theme="clear" 
            size={22}
            padding={0}
          />
        }
      />
    );
  };

  const renderNotificationsButton = () => {
    return (
      <ModalView 
        login={true}
        content={<NotificationsMenu />}
        backTitle={i18n.t('Notifications')}
        triggerAlignSelf="flex-end"
        trigger={    
          <IconView 
            label={notificationsCount > 0 ? ` ${notificationsCount}+` : ` 0 `} 
            theme="secondary" 
            size={13}
            padding={4.5}  
          />
        }
      />
    );
  };

  const renderSettingsButton = () => {
    return (
      <ModalView 
        login={true}
        content={<SettingsMenu />}
        backTitle={i18n.t('Settings')}
        triggerAlignSelf="flex-end"
        trigger={
          <IconView 
            name="menu" 
            theme="secondary"
            size={14}
            padding={6} 
          />
        }
      />
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
        <TouchableOpacity onPress={() => ScreenManager.toggleModal('JamsList')}>
          <LogoView size={Layout.logo.size} />
        </TouchableOpacity>
      </BoxView>

      { (route.name == 'jams' || activeModal?.headerNavigation) &&
        <BoxView direction="row" align="center" justify="space-around" style={styles.headerRight}>
          {renderSearchButton()}
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
    width: '100%',
    paddingVertical: Layout.space.base,
    paddingHorizontal: Layout.space.base*1.5,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    maxWidth: 110,
  },
});

export default HeaderNavigation;
