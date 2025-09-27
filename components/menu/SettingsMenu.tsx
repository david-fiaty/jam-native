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

  const getData = () => {
    return [
      {
        label: i18n.t('Your profile'),
        onPress: () => SectionManager.push(router, 'private-profile'),
      },
      {
        label: i18n.t('Change password'),
        onPress: () => SectionManager.push(router, 'reset-password'),
      },
      {
        label: i18n.t('Language'),
        onPress: () => SectionManager.push(router, 'language'),
      },
      {
        label: i18n.t('Logout'),
        onPress: () => {
          UserManager.logout();
          SectionManager.replace(router, 'welcome');
        },
      },
    ];
  };

  const renderItem = (row: any) => (
    <TouchableOpacity onPress={() => row.item.onPress()}>
      <View style={Layout.menuItem}>
        <TextView>{i18n.t(row.item.label)}</TextView>
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
        data={getData()}
        renderItem={(row: any) => renderItem(row)}
      />
    </BoxView>
  );
};

export default SettingsMenu;