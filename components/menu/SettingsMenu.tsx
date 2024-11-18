import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import BackButton from '../button/BackButton';
import i18n from '@/translation/i18n';
import ScreenManager from '@/classes/ScreenManager';

type ItemProps = {
  label: string,
  path: string,
};

const data: ItemProps[] = [
  {
    label: 'Account information',
    path: '/account',
  },
  {
    label: 'Change password',
    path: '/password',
  },
  {
    label: 'Language',
    path: '/language',
  },
];

const SettingsMenu = () => {
  const router = useRouter();
  
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
        onPress={() => ScreenManager.toggleModal({
          name: 'SettingsMenu',
        })}
      />
      <ListView 
        data={data} 
        renderItem={(row: any) => renderItem(row)}   
      />
    </View>
  );
};

export default SettingsMenu;