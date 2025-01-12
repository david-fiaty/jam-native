import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import BackButton from '../button/BackButton';
import i18n from '@/translation/i18n';
import ScreenManager from '@/manager/ScreenManager';

const SettingsMenu = () => {
  const router = useRouter();
  
  const data: any[] = [
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
        console.log('logoooout');
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
      <BackButton
        title={i18n.t('Settings')}
        onPress={() => ScreenManager.toggleScreen('SettingsMenu')}
      />
      <ListView 
        data={data} 
        renderItem={(row: any) => renderItem(row)}   
      />
    </View>
  );
};

export default SettingsMenu;