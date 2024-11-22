import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import LogoView from '../view/LogoView';
import SearchField from '../field/SearchField';
import ScreenManager from "@/manager/ScreenManager";
import UserManager from '@/manager/UserManager';
import { Colors } from '@/constants/Colors';

const HeaderNavigation = () => {
  const route = useRoute();
  const activeScreen = ScreenManager.getActiveScreen();
  const isLoggedIn = UserManager.isLoggedIn();

  return (
    <View style={styles.container}>
      <BoxView direction="row" align="center" justify="space-between" style={Layout.header}>
        <BoxView direction="row" align="center" style={Layout.headerRight}>
          <TouchableOpacity onPress={() => ScreenManager.toggleModal({
            name: 'JamsList',
          })}>
            <LogoView size={Layout.logo} />
          </TouchableOpacity>
        </BoxView>
        { (route.name == 'jams' || activeScreen?.headerNavigation) &&
          <BoxView direction="row" align="center" justify="space-between">
            <BoxView direction="row" align="center" style={Layout.headerRight}> 

              { isLoggedIn &&
                <IconView name="menu" theme="secondary" onPress={() => ScreenManager.toggleModal({
                  name: 'SettingsMenu',
                })} />
              }

              { isLoggedIn &&
                <IconView label="15+" theme="secondary" size={11.5} onPress={() => ScreenManager.toggleModal({
                  name: 'NotificationsMenu',
                })} />
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
