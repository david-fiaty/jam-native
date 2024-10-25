import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setTabActive } from "@/redux/slices/TabSlice";
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import LogoView from '../view/LogoView';

const HeaderNavigation = () => {
  const dispatch = useDispatch();

  return (
    <BoxView direction="row" align="center" justify="space-between" style={Layout.header}>
      <BoxView direction="row" align="center" style={Layout.headerRight}>
        <TouchableOpacity onPress={() => dispatch(setTabActive('JamsList'))}>
          <LogoView size={Layout.logo} />
        </TouchableOpacity>
      </BoxView>
      <BoxView direction="row" align="center" justify="space-between">
        <BoxView direction="row" align="center" style={Layout.headerRight}> 
          <IconView name="menu" theme="secondary" onPress={() => dispatch(setTabActive('SettingsMenu'))} />
          <IconView label="15+" theme="secondary" size={13} onPress={() => dispatch(setTabActive('NotificationsMenu'))} />
          <IconView name="search" theme="clear" onPress={() => dispatch(setTabActive('SearchView'))} />
        </BoxView>
      </BoxView>
    </BoxView>
  );
};

export default HeaderNavigation;
