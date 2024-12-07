import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import SpinnerView from '../view/SpinnerView';
import TextView from '../view/TextView';
import UserManager from "@/manager/UserManager";
import i18n from '@/translation/i18n';
import DividerView from '../view/DividerView';

type Props = BaseProps & {
  entityId?: any,
};

const NotificationScreen = ({entityId}: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [notificationsData, setNotificationsData] = useState<any>([]);
  const [entity, setEntity] = useState<any>(null);

  if (!isLoaded) { 
    UserManager.getNotifications().then((data: any) => {
      setNotificationsData(data);
      setEntity(data.find((o: any) => o.id == entityId));
      setIsLoaded(true);
    });
  }

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), Layout.animation.duration);
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Notification')}
        onPress={() => router.back()}
      />

      <TextView>
        {i18n.t('Type')}: {entity?.content?.notification_type}
      </TextView>      
      
      <TextView>
        {i18n.t('Content type')}: {entity?.content?.content_type}
      </TextView>      

      <DividerView theme="secondary" />
    
      <TextView style={styles.title}>{entity?.content?.content_data?.title}</TextView>
      <TextView>{entity?.content?.content_data?.caption}</TextView>

    </BoxView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
});

export default NotificationScreen;