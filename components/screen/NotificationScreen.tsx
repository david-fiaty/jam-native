import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import BoxView from "../view/BoxView";
import SpinnerView from '../view/SpinnerView';
import TextView from '../view/TextView';
import UserManager from "@/manager/UserManager";
import i18n from '@/translation/i18n';
import DividerView from '../view/DividerView';

type Props = BaseProps & {
  entityId?: any,
};

const NotificationScreen = ({ entityId }: Props) => {
  const router = useRouter();
  const [notificationsData, setNotificationsData] = useState<any>([]);
  const [entity, setEntity] = useState<any>(null);

  if (!notificationsData?.length) { 
    UserManager.getNotifications().then((data: any) => {
      setNotificationsData(data);
      setEntity(data.find((o: any) => o.id == entityId));
    });
  }

  if (!notificationsData?.length) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <TextView>{entity?.content?.content_data?.caption}</TextView>

      <DividerView theme="secondary" />
      <TextView>
        {i18n.t('Type')}: {entity?.content?.notification_type}
      </TextView>      
      
      <TextView>
        {i18n.t('Content type')}: {entity?.content?.content_type}
      </TextView>      


    </BoxView>
  );
};

export default NotificationScreen;