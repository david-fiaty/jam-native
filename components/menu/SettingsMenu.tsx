import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import UserManager from '@/manager/UserManager';
import BoxView from '../view/BoxView';
import AppManager from '@/manager/AppManager';

const SettingsMenu = () => {
  const router = useRouter();
  
  const data: any[] = [
    {
      label: i18n.t('Your profile'),
      onPress: (row: any) => {
        AppManager.push('profile', router);
      },
    },
    {
      label: i18n.t('Account information'),
      onPress: (row: any) => {
        AppManager.push('account', router);
      },
    },
    {
      label: i18n.t('Change password'),
      onPress: (row: any) => {
        AppManager.push('password', router);
      },
    },
    {
      label: i18n.t('Language'),
      onPress: (row: any) => {
        AppManager.push('language', router);
      },
    },
    {
      label: i18n.t('Logout'),
      path: null,
      onPress: (row: any) => {
        UserManager.logout(router);
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