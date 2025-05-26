import { useState, useEffect } from "react";
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Config } from "@/constants/Config";
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import UserManager from "@/manager/UserManager";
import SpinnerView from "../view/SpinnerView";
import BoxView from "../view/BoxView";
import SectionManager from "@/manager/SectionManager";

const NotificationsMenu = () => {
  const router = useRouter();
  const [notificationsData, setNotificationsData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const renderItem = (row: any) => (
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

  useEffect(() => {
    if (!isLoaded) {
      UserManager.getNotifications().then((data: any) => {
        if (data?.length > Config.maxNotificationsDisplay) {
          data = data.slice(Config.maxNotificationsDisplay - 1);
        }

        setNotificationsData(data);
        setIsLoaded(true);
      });
    }
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      style={Layout.menuContainer}
    >
      <ListView
        data={notificationsData}
        renderItem={(row: any) => renderItem(row)}
        emptyMessage={<TextView>{i18n.t('No notifications available.')}</TextView>}
      />
    </BoxView>
  );
};

export default NotificationsMenu;
