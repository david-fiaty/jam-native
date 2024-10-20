import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { Layout } from '@/constants/Layout';
import i18n from '@/translation/i18n'; 
import ImageBase from '@/components/base/ImageBase';
import ScreenView from '../view/ScreenView';
import IconView from '../view/IconView';
import HorizontalView from '../view/HorizontalView';

const source = require('@/assets/images/logo-48.png'); 

export default () => {  
  return (
    <ScreenView>      
      <HorizontalView>
        <HorizontalView>
          <TouchableOpacity onPress={() => {}}>
            <ImageBase source={source} width={styles.headerLogo.width} height={styles.headerLogo.height} />   
          </TouchableOpacity>
        </HorizontalView>
        <HorizontalView>
          <IconView name="menu" theme="primary" size={22} />
          <IconView label="15+" theme="secondary" size={13} />
          <IconView name="menu" theme="tertiary" size={22} />
        </HorizontalView>
      </HorizontalView>
      <Button title="My Button" />
      <Text>{i18n.t('welcome')}</Text>
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

