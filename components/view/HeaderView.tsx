import { StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import IconView from '../view/IconView';
import BoxView from '../view/BoxView';
import LogoView from '../view/LogoView';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

export default ({style, children}: BaseProps) => {
  return (
    <BoxView direction="row" justify="space-between" style={styles.container}>
      <BoxView direction="row" style={styles.left}>
        <TouchableOpacity onPress={() => {}}>
          <LogoView size={{width: 48, height: 48}} />
        </TouchableOpacity>
      </BoxView>
      <BoxView direction="row" style={styles.right}> 
        <IconView name="menu" theme="primary" size={22} onPress={() => {}} />
        <IconView label="15+" theme="secondary" size={13} onPress={() => {}} />
        <IconView name="search" theme="clear" size={22} onPress={() => {}} />
      </BoxView>
    </BoxView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: Layout.space.base,
    backgroundColor: 'red',
  },
  left: {
    gap: Layout.space.base,
  },
  right: {
    flexDirection: 'row',
    gap: Layout.space.base,
    backgroundColor: 'yellow',
  },
});

