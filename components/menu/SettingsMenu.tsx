import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import UserManager from '@/manager/UserManager';

const SettingsMenu = () => {
  const router = useRouter();
  
  const data: any[] = [
    {
      label: i18n.t('Your profile'),
      path: '/profile',
      onPress: (row: any) => {
        router.push(row.item.path);
      },
    },
    {
      label: i18n.t('Account information'),
      path: '/account',
      onPress: (row: any) => {
        router.push(row.item.path);
      },
    },
    {
      label: i18n.t('Change password'),
      path: '/password',
      onPress: (row: any) => {
        router.push(row.item.path);
      },
    },
    {
      label: i18n.t('Language'),
      path: '/language',
      onPress: (row: any) => {
        router.push(row.item.path);
      },
    },
    {
      label: i18n.t('Logout'),
      path: null,
      onPress: (row: any) => {
        UserManager.logout();
        router.replace('/welcome');
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
    <View style={Layout.menuContainer}>
      <ListView 
        data={data} 
        renderItem={(row: any) => renderItem(row)}   
      />
    </View>
  );
};

export default SettingsMenu;