import { useState, useEffect } from "react";
import { View, TouchableOpacity } from 'react-native';
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

  const renderItem = (row: any) => {
    return (
      <TouchableOpacity
        key={row.item.id}
        onPress={() => SectionManager.push(router, 'notification-item', { notificationId: JSON.stringify([row?.item?.id]), title: row.item?.content?.content_data?.title })}
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

export default NotificationsMenu;
