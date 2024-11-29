import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import BackButton from '../button/BackButton';
import i18n from '@/translation/i18n';
import ScreenManager from '@/manager/ScreenManager';

type ItemProps = {
  label: string,
  path: string,
};

const SettingsMenu = () => {
  const router = useRouter();
  
  const data: ItemProps[] = [
    {
      label: i18n.t('Account information'),
      path: '/account',
    },
    {
      label: i18n.t('Change password'),
      path: '/password',
    },
    {
      label: i18n.t('Language'),
      path: '/language',
    },
  ];
  
  const renderItem = (row: any) => (
    <TouchableOpacity onPress={() => router.push(row.item.path)}>
      <View style={Layout.menuItem}>
        <TextView>{row.item.label}</TextView>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={Layout.menuContainer}>
      <BackButton
        title={i18n.t('Settings')}
        onPress={() => ScreenManager.toggleModal('SettingsMenu')}
      />
      <ListView 
        data={data} 
        renderItem={(row: any) => renderItem(row)}   
      />
    </View>
  );
};

export default SettingsMenu;