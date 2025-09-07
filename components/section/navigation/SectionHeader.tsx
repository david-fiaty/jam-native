import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, shallowEqual } from "react-redux";
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Config } from "@/constants/Config";
import BoxView from '@/components/view/BoxView';
import LogoView from '@/components/view/LogoView';
import IconView from '@/components/view/IconView';
import ModalManager from '@/manager/ModalManager';
import UserManager from "@/manager/UserManager";
import SectionManager from "@/manager/SectionManager";

type Props = {
  style?: any;
};

const SectionHeader = ({ style }: Props) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any>([]);
  const [viewedNotificationsCount, setViewedNotificationsCount] = useState<number>(0);
  const modalState: any = useSelector((state: any) => state.modal, shallowEqual);

  const getIconTheme = (modalId: string) => {
    if (isIconActive(modalId)) {
      return 'primary';
    }

    return 'secondary';
  };

  const isIconActive = (modalId: string) => {
    return modalState.active.length > 0 && modalState.active[modalState.active.length - 1].id == modalId;
  };

  const getViewedNotificationsCount = async () => {
    return (await UserManager.getViewedNotifications())?.length || 0;
  };

  const loadNotifications = async () => {
    setNotifications(await UserManager.getNotifications());  
    setViewedNotificationsCount(await getViewedNotificationsCount());
  };

  const getNotificationsCount = () => {
    return notifications.length - viewedNotificationsCount;
  };

  const renderNotificationsCount = () => {
    let count: number = getNotificationsCount();

    if (count > 0) {
      return ` ${count}+ `;
    }

    return ` ${count} `;
  };

  useEffect(() => {
    setIsLoggedIn(UserManager.isLoggedIn());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadNotifications();

      const intervalId = setInterval(() => {
        loadNotifications();
      }, Config.notificationUpdateInterval);

      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn]);

  return (
    <BoxView direction="row" style={[styles.container, style]}>
      <BoxView direction="row" align="center" justify="flex-start" style={styles.headerLeft}>
        <TouchableOpacity onPress={() => SectionManager.push(router, Config.mainSection)}>
          <LogoView size={Layout.logo.size} />
        </TouchableOpacity>
      </BoxView>

      <BoxView direction="row" align="center" justify="flex-end" style={styles.headerRight}>
        <IconView
          name="search"
          size={!!isIconActive('SearchView') ? 14 : 22}
          padding={!!isIconActive('SearchView') ? 6 : 0}
          theme={!!isIconActive('SearchView') ? getIconTheme('SearchView') : 'clear'}
          onPress={() => isLoggedIn ? ModalManager.toggleModal('SearchView') : SectionManager.push(router, 'login')}
        />

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
            label={renderNotificationsCount()}
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
