import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import UserManager from '@/manager/UserManager';
import BoxView from '../view/BoxView';
import ScreenManager from '@/manager/ScreenManager';
import AppManager from '@/manager/AppManager';

const SettingsMenu = () => {
  const router = useRouter();
  
  const data: any[] = [
    {
      label: i18n.t('Your profile'),
      path: '/profile',
      onPress: (row: any) => {
        AppManager.push('/profile', router);
      },
    },
    {
      label: i18n.t('Account information'),
      path: '/account',
      onPress: (row: any) => {
        ScreenManager.pushScreen(router, row.item.path);
      },
    },
    {
      label: i18n.t('Change password'),
      path: '/password',
      onPress: (row: any) => {
        ScreenManager.pushScreen(router, row.item.path);
      },
    },
    {
      label: i18n.t('Language'),
      path: '/language',
      onPress: (row: any) => {
        ScreenManager.pushScreen(router, row.item.path);
      },
    },
    {
      label: i18n.t('Logout'),
      path: null,
      onPress: (row: any) => {
        UserManager.logout();
        ScreenManager.replaceScreen(router, '/');
      },
    },
  ];
  
  const renderItem = (row: any) => (
    <TouchableOpacity onPress={() => row.item.onPress(row)}>
      <View style={Layout.menuItem}>
        <TextView>{row.item.label}</TextView>
      </View>
    </TouchableOpacity>
  );

  return (
    <BoxView 
      align="flex-start"
      justify="flex-start"
      style={Layout.menuContainer}
    >
      <ListView 
        data={data} 
        renderItem={(row: any) => renderItem(row)}   
      />
    </BoxView>
  );
};

export default SettingsMenu;