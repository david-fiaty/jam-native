import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import LogoView from '../view/LogoView';
import SearchField from '../field/SearchField';
import ScreenManager from "@/classes/ScreenManager";
import UserManager from '@/classes/UserManager';

const HeaderNavigation = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const activeScreen = ScreenManager.getActiveScreen();
  const isLoggedIn = UserManager.isLoggedIn();

  return (
    <BoxView direction="row" align="center" justify="space-between" style={Layout.header}>
      <BoxView direction="row" align="center" style={Layout.headerRight}>
        <TouchableOpacity onPress={() => dispatch(setActiveScreen({
          name: 'JamsList',
        }))}>
          <LogoView size={Layout.logo} />
        </TouchableOpacity>
      </BoxView>
      { (route.name == 'jams' || activeScreen?.headerNavigation) &&
        <BoxView direction="row" align="center" justify="space-between">
          <BoxView direction="row" align="center" style={Layout.headerRight}> 

            { isLoggedIn &&
              <IconView name="menu" theme="secondary" onPress={() => dispatch(setActiveScreen({
                name: 'SettingsMenu',
              }))} />
            }

            { isLoggedIn &&
              <IconView label="15+" theme="secondary" size={11} onPress={() => dispatch(setActiveScreen({
                name: 'NotificationsMenu',
              }))} />
            }
              
            <SearchField />
            
          </BoxView>
        </BoxView>
      }
      
    </BoxView>
  );
};

export default HeaderNavigation;
