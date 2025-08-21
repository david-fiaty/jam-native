import { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Config } from "@/constants/Config";
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import UserManager from "@/manager/UserManager";
import BoxView from "../view/BoxView";
import SectionManager from "@/manager/SectionManager";

const NotificationsMenu = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any>([]);

  const onItemPress = (row: any) => {
    SectionManager.push(router, 'notification-item', { 
      notificationId: JSON.stringify([row?.item?.id]), 
      title: row.item?.content?.content_data?.title 
    });
  };

  const renderItem = (row: any) => {
    return (
      <TouchableOpacity
        key={row.item.id}
        onPress={() => onItemPress(row)}
        //style={styles.notificationViewed}
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
    loadNotifications();

    const intervalId = setInterval(() => {
      loadNotifications();
    }, Config.notificationUpdateInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      style={Layout.menuContainer}
    >
      <ListView
        data={notifications}
        renderItem={(row: any) => renderItem(row)}
        emptyMessage={<TextView>{i18n.t('No notifications available.')}</TextView>}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  notificationViewed: {
    opacity: 0.5,
  },
});


export default NotificationsMenu;
