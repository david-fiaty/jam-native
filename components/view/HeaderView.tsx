import { StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import IconView from '../view/IconView';
import BoxView from '../view/BoxView';
import LogoView from '../view/LogoView';
import { Layout } from '@/constants/Layout';

const HeaderView = () => {
  return (
    <BoxView direction="row" align="center" justify="space-between" style={Layout.header}>
      <BoxView direction="row" align="center" style={Layout.headerLeft}>
        <TouchableOpacity onPress={() => {}}>
          <LogoView size={Layout.logo} />
        </TouchableOpacity>
      </BoxView>
      <BoxView direction="row" align="center" justify="space-between">
        <BoxView direction="row" align="center" style={Layout.headerRight}> 
          <IconView name="menu" theme="secondary" size={22} onPress={() => {}} />
          <IconView label="15+" theme="secondary" size={13} onPress={() => {}} />
          <IconView name="search" theme="clear" size={22} onPress={() => {}} />
        </BoxView>
      </BoxView>
    </BoxView>
  );
};

export default HeaderView;