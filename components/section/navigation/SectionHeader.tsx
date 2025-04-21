import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import BoxView from '@/components/view/BoxView';
import LogoView from '@/components/view/LogoView';
import IconView from '@/components/view/IconView';
import ModalManager from '@/manager/ModalManager';
import UserManager from "@/manager/UserManager";

const SectionHeader = () => {
  const router = useRouter();
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setNotificationsCount(await UserManager.getNotifications());
      setIsLoaded(true);
    })();
  }, [isLoaded]);

  return (
    <BoxView direction="row" style={styles.container}>
      <BoxView direction="row" align="center" justify="flex-start" style={styles.headerLeft}>
        <TouchableOpacity onPress={() => router.replace('/')}>
          <LogoView size={Layout.logo.size} />
        </TouchableOpacity>
      </BoxView>

      <BoxView direction="row" align="center" justify="flex-end" style={styles.headerRight}>
        <IconView
          name="search"
          size={22}
          padding={0}
          theme="clear"
        />

        <IconView
          label={notificationsCount > 0 ? ` ${notificationsCount}+` : ` 0 `} 
          size={13}
          padding={4.5}
          theme="secondary"
          onPress={() => ModalManager.toggleModal('NotificationsMenu')}
        />

        <IconView
          name="menu"
          size={14}
          padding={6}
          theme="secondary"
          onPress={() => ModalManager.toggleModal('SettingsMenu')}
        />

      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    gap: 0,
  },
  headerLeft: {
    backgroundColor: 'yellow',
    width: '50%',
  },
  headerRight: {
    backgroundColor: 'yellow',
    width: '50%',
  },
});

export default SectionHeader;
