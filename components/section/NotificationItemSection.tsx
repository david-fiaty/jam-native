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
  const [notificationsData, setNotificationsData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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

  console.log(notificationsData)

  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={styles.container}
    >
      <TextView>Notification {notificationId}</TextView>
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
