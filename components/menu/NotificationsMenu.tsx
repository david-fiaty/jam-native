import { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Layout } from '@/constants/Layout';
import { Config } from "@/constants/Config";
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import UserManager from "@/manager/UserManager";
import BoxView from "../view/BoxView";
import SectionManager from "@/manager/SectionManager";
import ScreenManager from "@/manager/ScreenManager";
import SpinnerView from "../view/SpinnerView";

const NotificationsMenu = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [viewedIds, setViewedIds] = useState<any>([]);

  const onItemPress = async (row: any) => {
    await setStorageId(row.item.id);

    SectionManager.push(router, 'notification-item', {
      notificationId: JSON.stringify([row.item.id]),
      title: row.item?.content?.content_data?.title
    });
  };

  const setStorageId = async (rowId: any) => {
    let idArray: any[] = [...new Set([...viewedIds, rowId])];
    setViewedIds(idArray);

    if (ScreenManager.isWeb()) {
      localStorage.setItem(Config.storageKeys.viewedNotifications, JSON.stringify(idArray));
    }
    else {
      await AsyncStorage.setItem(Config.storageKeys.viewedNotifications, JSON.stringify(idArray));
    }
  };

  const renderItem = (row: any) => {
    return (
      <TouchableOpacity
        key={row.item.id}
        onPress={() => onItemPress(row)}
        style={viewedIds.includes(row.item.id) ? styles.viewedItem : {}}
      >
        <View style={Layout.menuItem}>
          <TextView>
            {row.item?.content?.content_data?.title}
          </TextView>
        </View>
      </TouchableOpacity>
    );
  };

  const loadNotifications = async () => {
    setNotifications(await UserManager.getNotifications());
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setViewedIds(await UserManager.getViewedNotifications());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  useEffect(() => {
    loadNotifications();

    const intervalId = setInterval(() => loadNotifications(), Config.notificationUpdateInterval);

    return () => clearInterval(intervalId);
  }, []);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      style={Layout.menuContainer}
    >
      {!!notifications?.length && (
        <ListView
          data={notifications}
          renderItem={(row: any) => renderItem(row)}
        />
      )}

      {!notifications?.length && (
        <TextView>{i18n.t('No notifications available.')}</TextView>
      )}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  viewedItem: {
    opacity: 0.5,
  },
});


export default NotificationsMenu;
