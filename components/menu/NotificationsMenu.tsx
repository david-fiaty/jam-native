import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import BackButton from '../button/BackButton';
import i18n from '@/translation/i18n';
import ScreenManager from '@/classes/ScreenManager';

const data = [
  {
    label: 'Lorem ipsum dolor sit amet',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    label: 'Consectetur adipiscing elit',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    label: 'Sed do eiusmod tempor',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    label: 'Incididunt ut labore et dolore magna aliqua',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    label: 'Ut enim ad minim veniam, quis nostrud',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    label: 'Exercitation ullamco laboris nisi',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    label: 'Excepteur sint occaecat cupidatat',
    path: '/notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },  
];

const NotificationsMenu = () => {
  const router = useRouter();

  const renderItem = (row: any) => (
    <TouchableOpacity key="id" onPress={() => router.push({ 
      pathname: '/notification', 
      params: row.item, 
    })}>
      <View style={Layout.menuItem}>
        <TextView>{row.item.label}</TextView>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={Layout.menuContainer}>
      <BackButton
        title={i18n.t('Notifications')}
        onPress={() => ScreenManager.toggleModal({
          name: 'NotificationsMenu',
        })}
      />
      <ListView 
        data={data} 
        renderItem={(row: any) => renderItem(row)}   
      />
    </View>
  );
};

export default NotificationsMenu;
