import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setActiveTab } from "@/redux/slices/TabSlice";
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import LogoView from '../view/LogoView';

const HeaderNavigation = () => {
  const dispatch = useDispatch();

  return (
    <BoxView direction="row" align="center" justify="space-between" style={Layout.header}>
      <BoxView direction="row" align="center" style={Layout.headerRight}>
        <TouchableOpacity onPress={() => dispatch(setActiveTab('JamsList'))}>
          <LogoView size={Layout.logo} />
        </TouchableOpacity>
      </BoxView>
      <BoxView direction="row" align="center" justify="space-between">
        <BoxView direction="row" align="center" style={Layout.headerRight}> 
          <IconView name="menu" theme="secondary" onPress={() => dispatch(setActiveTab('SettingsMenu'))} />
          <IconView label="15+" theme="secondary" size={13} onPress={() => dispatch(setActiveTab('NotificationsMenu'))} />
          <IconView name="search" theme="clear" onPress={() => dispatch(setActiveTab('SearchView'))} />
        </BoxView>
      </BoxView>
    </BoxView>
  );
};

export default HeaderNavigation;
