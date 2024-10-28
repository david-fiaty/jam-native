import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import BackButton from '../button/BackButton';
import i18n from '@/translation/i18n';
import DataManager from '@/classes/DataManager';

const NotificationsMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = DataManager.get('notifications');

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
        onPress={() => dispatch(setActiveScreen({
          name: 'NotificationsMenu',
        }))}
      />
      <ListView 
        data={items} 
        renderItem={({item, index}) => renderItem(item, index)}   
      />
    </View>
  );
};

export default NotificationsMenu;
