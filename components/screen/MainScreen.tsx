import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { GlobalStyles } from '@/constants/GlobalStyles';
import i18n from '@/translation/i18n'; 
import DeviceManager from '@/classes/DeviceManager';
import TextBlock from '@/components/base/TextBlock';
import StaticImage from '@/components/base/StaticImage';
import ScreenView from '../view/ScreenView';

const source = require('@/assets/images/logo-48.png'); 

export default () => {  
  return (
    <ScreenView>
      <View style={styles.container}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => {}}>
            <StaticImage source={source} width={Layout.header.logo.width} height={Layout.header.logo.height} />   
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          <TextBlock>X</TextBlock>
        </View>
      </View>



      <Button title="My Button" />
      <Text>{i18n.t('welcome')}</Text>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
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
});

