import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import UserManager from '@/manager/UserManager';
import BoxView from '../view/BoxView';
import SectionManager from '@/manager/SectionManager';

const SettingsMenu = () => {
  const router = useRouter();
  
  const data: any[] = [
    {
      label: i18n.t('Your profile'),
      onPress: () => SectionManager.push(router, 'profile'),
    },
    {
      label: i18n.t('Change password'),
      onPress: () => SectionManager.push(router, 'password'),
    },
    {
      label: i18n.t('Language'),
      onPress: () => SectionManager.push(router, 'language'),
    },
    {
      label: i18n.t('Logout'),
      path: null,
      onPress: () => {
        UserManager.logout();
        SectionManager.replace(router, '/');
      },
    },
  ];
  
  const renderItem = (row: any) => (
    <TouchableOpacity onPress={() => row.item.onPress()}>
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