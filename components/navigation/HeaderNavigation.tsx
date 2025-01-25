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
import ModalView from "../view/ModalView";
import i18n from "@/translation/i18n";
import SettingsMenu from "../menu/SettingsMenu";
import NotificationsMenu from "../menu/NotificationsMenu";
import SearchView from "../view/SearchView";

const HeaderNavigation = () => {
  const route = useRoute();
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const activeModal = ScreenManager.getActiveModal();
  const isLoggedIn = UserManager.isLoggedIn();

  if (!notificationsCount) {
    UserManager.getNotifications().then((data: any) => {
      setNotificationsCount(data.length);
    });
  }

  return (
    <View style={styles.container}>
      <BoxView direction="row" align="center" justify="space-between" style={Layout.header}>
        <BoxView direction="row" align="center" style={styles.headerRight}>
          <TouchableOpacity onPress={() => ScreenManager.toggleModal('JamsList')}>
            <LogoView size={Layout.logo.size} />
          </TouchableOpacity>
        </BoxView>
        { (route.name == 'jams' || activeModal?.headerNavigation) &&
          <BoxView direction="row" align="center" justify="space-between">
            <BoxView direction="row" align="center" style={styles.headerRight}> 
              <ModalView 
                login={false}
                content={<SearchView />}
                backTitle={i18n.t('Search')}
                trigger={    
                  <IconView 
                    name="search" 
                    theme="clear" 
                    size={22}
                    padding={0}
                  />
                }
              />

              { isLoggedIn &&
                <ModalView 
                  login={true}
                  content={<NotificationsMenu />}
                  backTitle={i18n.t('Notifications')}
                  trigger={    
                    <IconView 
                      label={notificationsCount > 0 ? ` ${notificationsCount}+` : ` 0 `} 
                      theme="secondary" 
                      size={13}
                      padding={4.5}  
                    />
                  }
                />
              }
              
              { isLoggedIn &&
                <ModalView 
                  login={true}
                  content={<SettingsMenu />}
                  backTitle={i18n.t('Settings')}
                  trigger={
                    <IconView 
                      name="menu" 
                      theme="secondary"
                      size={14}
                      padding={6} 
                    />
                  }
                />
              }

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
  headerLeft: {
    gap: Layout.space.base,
  },
  headerRight: {
    flexDirection: 'row',
    gap: Layout.space.base*1.1,
  },
});

export default HeaderNavigation;
