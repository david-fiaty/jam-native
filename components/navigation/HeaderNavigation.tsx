import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import LogoView from '../view/LogoView';
import SearchField from '../field/SearchField';
import ScreenManager from "@/manager/ScreenManager";
import UserManager from '@/manager/UserManager';

const HeaderNavigation = () => {
  const route = useRoute();
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const activeScreen = ScreenManager.getActiveScreen();
  const isLoggedIn = UserManager.isLoggedIn();

  if (!notificationsCount) {
    UserManager.getNotifications().then((data: any) => {
      setNotificationsCount(data.length);
    });
  }

  return (
    <View style={styles.container}>
      <BoxView direction="row" align="center" justify="space-between" style={Layout.header}>
        <BoxView direction="row" align="center" style={Layout.headerRight}>
          <TouchableOpacity onPress={() => ScreenManager.toggleScreen('JamsList')}>
            <LogoView size={Layout.logo.size} />
          </TouchableOpacity>
        </BoxView>
        { (route.name == 'jams' || activeScreen?.headerNavigation) &&
          <BoxView direction="row" align="center" justify="space-between">
            <BoxView direction="row" align="center" style={Layout.headerRight}> 
              { isLoggedIn &&
                <IconView 
                  name="menu" 
                  theme="secondary"
                  size={16}
                  padding={6} 
                  onPress={() => ScreenManager.toggleScreen('SettingsMenu')} 
                />
              }

              { isLoggedIn &&
                <IconView 
                  label={` ${notificationsCount}+`} 
                  theme="secondary" 
                  size={13}
                  padding={4.8} 
                  onPress={() => ScreenManager.toggleScreen('NotificationsMenu')} 
                />
              }
                
              <SearchField />
              
            </BoxView>
          </BoxView>
        }
      </BoxView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
});

export default HeaderNavigation;
