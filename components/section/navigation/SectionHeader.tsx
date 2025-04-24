import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Config } from "@/constants/Config";
import { Colors } from '@/constants/Colors';
import BoxView from '@/components/view/BoxView';
import LogoView from '@/components/view/LogoView';
import IconView from '@/components/view/IconView';
import ModalManager from '@/manager/ModalManager';
import UserManager from "@/manager/UserManager";
import SearchField from "@/components/field/SearchField";

type Props = {
  style?: any;
};

const SectionHeader = ({ style } : Props) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const modalState: any = useSelector((state: any) => state.modal);

  const getIconTheme = (modalId: string) => {
    if (modalState.active.length > 0 && modalState.active[modalState.active.length - 1].id == modalId) {
      return 'primary';
    }

    return 'secondary';
  };

  useEffect(() => {
    (async () => {
      setIsLoggedIn(await UserManager.isLoggedIn());
      setNotificationsCount(await UserManager.getNotifications());
      setIsLoaded(true);
    })();
  }, [isLoaded]);

  return (
    <BoxView direction="row" style={[styles.container, style]}>
      <BoxView direction="row" align="center" justify="flex-start" style={styles.headerLeft}>
        <TouchableOpacity onPress={() => router.replace(Config.mainRoute)}>
          <LogoView size={Layout.logo.size} />
        </TouchableOpacity>
      </BoxView>

      <BoxView direction="row" align="center" justify="flex-end" style={styles.headerRight}>      
        {isLoggedIn && (  
          <SearchField 
            // Todo - Implement handlers
            //onSearchEdit={onSearchEdit}
            //onSearchSubmit={onSearchSubmit} 
            //onSearchClear={onSearchClear} 
          />)
        }

        {isLoggedIn && (
          <IconView
            label={notificationsCount > 0 ? ` ${notificationsCount}+` : ` 0 `} 
            size={13}
            padding={4.5}
            theme={getIconTheme('NotificationsMenu')}
            onPress={() => ModalManager.toggleModal('NotificationsMenu')}
          />
        )}

        {isLoggedIn && (
          <IconView
            name="menu"
            size={14}
            padding={6}
            theme={getIconTheme('SettingsMenu')}
            onPress={() => ModalManager.toggleModal('SettingsMenu')}
          />
        )}

      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 0,
    marginTop: Layout.space.base*1.5,
    marginBottom: Layout.space.base*1.5,
    backgroundColor: Colors.white,
  },
  headerLeft: {
    width: '50%',
  },
  headerRight: {
    width: '50%',
  },
});

export default SectionHeader;
