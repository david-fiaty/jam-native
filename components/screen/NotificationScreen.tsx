import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import SpinnerView from '../view/SpinnerView';
import TextView from '../view/TextView';
import UserManager from "@/manager/UserManager";

type Props = BaseProps & {
  entityId?: any,
};

const NotificationScreen = ({entityId}: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [notificationsData, setNotificationsData] = useState<any>([]);

  if (!isLoaded) { 
    UserManager.getNotifications().then((data: any) => {
      setNotificationsData(data);
      setIsLoaded(true);
    });
  }

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), Layout.animation.duration);
  });

  
  console.log(notificationsData);
  console.log(entityId);


  return <SpinnerView />;

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={item.label}
        onPress={() => router.back()}
      />
      
      <TextView>
        {item.content}
      </TextView>
    </BoxView>
  );
};

export default NotificationScreen;