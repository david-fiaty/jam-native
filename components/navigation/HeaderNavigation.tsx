import { useEffect, useState } from "react";
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setTabActive } from "@/redux/slices/TabSlice";
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import LogoView from '../view/LogoView';

const HeaderNavigation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), Layout.animation.duration);
  });

  if (!isLoaded) return <></>;

  return (
    <BoxView direction="row" align="center" justify="space-between" style={Layout.header}>
      <BoxView direction="row" align="center" style={Layout.headerRight}>
        <TouchableOpacity onPress={() => {}}>
          <LogoView size={Layout.logo} />
        </TouchableOpacity>
      </BoxView>
      <BoxView direction="row" align="center" justify="space-between">
        <BoxView direction="row" align="center" style={Layout.headerRight}> 
          <IconView name="menu" theme="secondary" size={22} onPress={() => dispatch(setTabActive('SettingsMenu'))} />
          <IconView label="15+" theme="secondary" size={13} onPress={() => dispatch(setTabActive('NotificationsMenu'))} />
          <IconView name="search" theme="clear" size={22} onPress={() => dispatch(setTabActive('SearchScreen'))} />
        </BoxView>
      </BoxView>
    </BoxView>
  );
};

export default HeaderNavigation;
