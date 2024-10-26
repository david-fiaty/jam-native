import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setActiveTab } from "@/redux/slices/TabSlice";
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import ApiClient from '@/classes/ApiClient';
import BackButton from '../button/BackButton';
import i18n from '@/translation/i18n';

const NotificationsMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = ApiClient.get('notifications');

  const renderItem = (item, index) => (
    <TouchableOpacity onPress={() => router.push({ 
      pathname: '/notification', 
      params: item, 
    })}>
      <View style={Layout.menuItem}>
        <TextView>{item.label}</TextView>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={Layout.menuContainer}>
      <BackButton
        title={i18n.t('Notifications')}
        onPress={() => dispatch(setActiveTab('NotificationsMenu'))}
      />
      <ListView 
        data={items} 
        renderItem={({item, index}) => renderItem(item, index)}   
      />
    </View>
  );
};

export default NotificationsMenu;
