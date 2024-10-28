import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import LogoView from '../view/LogoView';
import SearchField from '../field/SearchField';
import ScreenManager from "@/classes/ScreenManager";

const HeaderNavigation = () => {
  const dispatch = useDispatch();
  const activeScreen = ScreenManager.getActiveScreen();

  console.log(activeScreen);

  return (
    <BoxView direction="row" align="center" justify="space-between" style={Layout.header}>
      <BoxView direction="row" align="center" style={Layout.headerRight}>
        <TouchableOpacity onPress={() => dispatch(setActiveScreen('JamsList'))}>
          <LogoView size={Layout.logo} />
        </TouchableOpacity>
      </BoxView>
      <BoxView direction="row" align="center" justify="space-between">
        <BoxView direction="row" align="center" style={Layout.headerRight}> 
          <IconView name="menu" theme="secondary" onPress={() => dispatch(setActiveScreen('SettingsMenu'))} />
          <IconView label="15+" theme="secondary" size={13} onPress={() => dispatch(setActiveScreen('NotificationsMenu'))} />
          <SearchField />
        </BoxView>
      </BoxView>
    </BoxView>
  );
};

export default HeaderNavigation;
