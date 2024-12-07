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

const data = [
  {
    label: 'Lorem ipsum dolor sit amet',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    label: 'Consectetur adipiscing elit',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    label: 'Sed do eiusmod tempor',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    label: 'Incididunt ut labore et dolore magna aliqua',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    label: 'Ut enim ad minim veniam, quis nostrud',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    label: 'Exercitation ullamco laboris nisi',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    label: 'Excepteur sint occaecat cupidatat',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },  
];

const NotificationsMenu = () => {
  const router = useRouter();
  const [notificationsData, setNotificationsData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const renderItem = (row: any) => (
    <TouchableOpacity 
      key="id" 
      onPress={() => router.push({ 
        pathname: '/notification', 
        params: row.item, 
      })}
    >
      <View style={Layout.menuItem}>
        <TextView>{row.item.label}</TextView>
      </View>
    </TouchableOpacity>
  );


  if (!notificationsData) { 
    UserManager.getNotifications().then((data: any) => {
      setNotificationsData(data);
      setIsLoaded(true);

      console.log(data);
    });
  }

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={Layout.menuContainer}>
      <BackButton
        title={i18n.t('Notifications')}
        onPress={() => ScreenManager.toggleModal('NotificationsMenu')}
      />
      <ListView 
        data={data} 
        renderItem={(row: any) => renderItem(row)}   
      />
    </View>
  );
};

export default NotificationsMenu;
