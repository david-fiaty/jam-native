import { StyleSheet, View, TouchableOpacity } from 'react-native';
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
      <View style={styles.container}>
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

        <VerticalView style={styles.content}>
          <Button title="My Button" />
          <Text>{i18n.t('welcome')}</Text>
        </VerticalView>

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
      </View>        
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: 'red',
  },
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
  content: {
    backgroundColor: 'green',
    flexGrow: 1,
  },
});

