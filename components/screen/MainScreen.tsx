import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { Layout } from '@/constants/Layout';
import i18n from '@/translation/i18n'; 
import ScreenView from '../view/ScreenView';
import IconView from '../view/IconView';
import HorizontalView from '../view/HorizontalView';
import LogoView from '../view/LogoView';
import VerticalView from '../view/VerticalView';

export default () => {  
  return (
    <ScreenView>      
      <HorizontalView>
        <HorizontalView>
          <TouchableOpacity onPress={() => {}}>
            <LogoView size={styles.headerLogo} />
          </TouchableOpacity>
        </HorizontalView>
        <HorizontalView>
          <IconView name="menu" theme="primary" size={22} />
          <IconView label="15+" theme="secondary" size={13} />
          <IconView name="search" theme="clear" size={22} />
        </HorizontalView>
      </HorizontalView>
      <VerticalView>
        <Button title="My Button" />
        <Text>{i18n.t('welcome')}</Text>
      </VerticalView>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.space.base,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.space.base,
  },
  headerLogo: {
    width: Layout.header.logo.width,
    height: Layout.header.logo.height,
  },
});

