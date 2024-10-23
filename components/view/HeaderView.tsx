import { StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import IconView from '../view/IconView';
import BoxView from '../view/BoxView';
import LogoView from '../view/LogoView';
import { Layout } from '@/constants/Layout';

const HeaderView = () => {
  return (
    <BoxView direction="row" align="center" justify="space-between" style={styles.container}>
      <BoxView direction="row" align="center" style={styles.left}>
        <TouchableOpacity onPress={() => {}}>
          <LogoView size={Layout.logo} />
        </TouchableOpacity>
      </BoxView>
      <BoxView direction="row" align="center" justify="space-between">
        <BoxView direction="row" align="center" style={styles.right}> 
          <IconView name="menu" theme="secondary" size={22} onPress={() => {}} />
          <IconView label="15+" theme="secondary" size={13} onPress={() => {}} />
          <IconView name="search" theme="clear" size={22} onPress={() => {}} />
        </BoxView>
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: Layout.space.base,
  },
  left: {
    gap: Layout.space.base,
  },
  right: {
    flexDirection: 'row',
    gap: Layout.space.base,
  },
});

export default HeaderView;