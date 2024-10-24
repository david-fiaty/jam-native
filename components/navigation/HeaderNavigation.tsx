import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import LogoView from '../view/LogoView';
import { setTabActive } from "@/redux/slices/TabSlice";

const HeaderNavigation = () => {
  const dispatch = useDispatch();
  const tabState = useSelector((state) => state.tab);
  
  return (
    <BoxView direction="row" align="center" justify="space-between" style={Layout.header}>
      <BoxView direction="row" align="center" style={Layout.headerRight}>
        <TouchableOpacity onPress={() => {}}>
          <LogoView size={Layout.logo} />
        </TouchableOpacity>
      </BoxView>
      <BoxView direction="row" align="center" justify="space-between">
        <BoxView direction="row" align="center" style={Layout.headerRight}> 
          <IconView name="menu" theme="secondary" size={22} onPress={() => dispatch(setTabActive('AddJamForm'))} />
          <IconView label="15+" theme="secondary" size={13} onPress={() => {}} />
          <IconView name="search" theme="clear" size={22} onPress={() => {}} />
        </BoxView>
      </BoxView>
    </BoxView>
  );
};

export default HeaderNavigation;
