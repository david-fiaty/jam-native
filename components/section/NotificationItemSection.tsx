import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Config } from "@/constants/Config";
import BoxView from '../view/BoxView';
import TextView from "../view/TextView";
import UserManager from "@/manager/UserManager";
import SpinnerView from "../view/SpinnerView";

type Props = {
  notificationId: any;
};

const NotificationItemSection = ({ notificationId }: Props) => {
  const [notificationItem, setNotificationItem] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  notificationId = JSON.parse(notificationId)[0];

  useEffect(() => {
    if (!isLoaded) {
      UserManager.getNotifications().then((data: any) => {
        setNotificationItem(data.find((o: any) => o.id == notificationId));
        setIsLoaded(true);
      });
    }
  }, [isLoaded, notificationId]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="center"
      justify="flex-start"
      style={styles.container}
    >
      <TextView>{notificationItem?.content?.content_data?.caption}</TextView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
});

export default NotificationItemSection;
