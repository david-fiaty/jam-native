import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Config } from "@/constants/Config";
import BoxView from '@/components/view/BoxView';
import LogoView from '@/components/view/LogoView';
import IconView from '@/components/view/IconView';
import ModalManager from '@/manager/ModalManager';
import UserManager from "@/manager/UserManager";
import SearchField from "@/components/field/SearchField";
import SectionManager from "@/manager/SectionManager";

type Props = {
  style?: any;
};

const SectionHeader = ({ style }: Props) => {
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
      setIsLoggedIn(UserManager.isLoggedIn());
      setNotificationsCount((await UserManager.getNotifications())?.length);
      setIsLoaded(true);
    })();
  }, [isLoaded]);

  return (
    <BoxView direction="row" style={[styles.container, style]}>
      <BoxView direction="row" align="center" justify="flex-start" style={styles.headerLeft}>
        <TouchableOpacity onPress={() => SectionManager.push(router, Config.mainSection)}>
          <LogoView size={Layout.logo.size} />
        </TouchableOpacity>
      </BoxView>

      <BoxView direction="row" align="center" justify="flex-end" style={styles.headerRight}>
        <SearchField />

        {!isLoggedIn && (
          <IconView
            name="user"
            size={14}
            padding={6}
            onPress={() => SectionManager.push(router, 'login')}
          />
        )}

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
    marginTop: Layout.space.base * 1.5,
    marginBottom: Layout.space.base * 1.5,
    backgroundColor: Layout.colors.white,
  },
  headerLeft: {
    width: '42%',
    maxWidth: 135,
  },
  headerRight: {
    flex: 1,
  },
});

export default SectionHeader;
