import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { Layout } from '@/constants/Layout';
import i18n from '@/translation/i18n'; 
import TextBase from '@/components/base/TextBase';
import ImageBase from '@/components/base/ImageBase';
import ScreenView from '../view/ScreenView';
import PrimaryIcon from '../icon/PrimaryIcon';

const source = require('@/assets/images/logo-48.png'); 

export default () => {  
  return (
    <ScreenView>
      <View style={styles.container}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => {}}>
            <ImageBase source={source} width={styles.headerLogo.width} height={styles.headerLogo.height} />   
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <PrimaryIcon name="menu" size={32} />
        </View>
      </View>


 
      <Button title="My Button" />
      <Text>{i18n.t('welcome')}</Text>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
  },
  header: {},
  headerLeft: {},
  headerRight: {},
  headerLogo: {
    width: Layout.header.logo.width,
    height: Layout.header.logo.height,
  },

  /*
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: DeviceManager.statusBar.height,
    paddingHorizontal: Layout.space.container,
  },
  left: {
    gap: GlobalStyles.space.base,
  },
  right: {
    flexDirection: 'row',
    gap: Layout.space.base,
  },
  icon: {
    ...GlobalStyles.icon,
    ...{
      backgroundColor: Colors.tertiary,
      padding: 8,
      borderRadius: 40,
    },
  },
  */
});

