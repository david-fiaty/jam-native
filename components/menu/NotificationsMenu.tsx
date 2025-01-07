import { useState } from "react";
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import BackButton from '../button/BackButton';
import i18n from '@/translation/i18n';
import ScreenManager from '@/manager/ScreenManager';
import UserManager from "@/manager/UserManager";
import SpinnerView from "../view/SpinnerView";

const NotificationsMenu = () => {
  const router = useRouter();
  const [notificationsData, setNotificationsData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const renderItem = (row: any) => (
    <TouchableOpacity 
      key={row.item.id} 
      onPress={() => router.push({ 
        pathname: '/notification', 
        params: {entityId: row.item.id}, 
      })}
    >
      <View style={Layout.menuItem}>
        <TextView>
          {row.item?.content?.content_data?.title}
        </TextView>
      </View>
    </TouchableOpacity>
  );

  if (!isLoaded) { 
    UserManager.getNotifications().then((data: any) => {
      setNotificationsData(data);
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={Layout.menuContainer}>
      <BackButton
        title={i18n.t('Notifications')}
        onPress={() => ScreenManager.toggleScreen('NotificationsMenu')}
      />
      <ListView 
        data={notificationsData} 
        renderItem={(row: any) => renderItem(row)}   
      />
    </View>
  );
};

export default NotificationsMenu;
