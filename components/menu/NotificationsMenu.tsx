import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setTabActive } from "@/redux/slices/TabSlice";
import { Layout } from '@/constants/Layout';
import { ListItemProps } from '@/constants/Types';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import ApiClient from '@/classes/ApiClient';
import BackButton from '../button/BackButton';
import i18n from '@/translation/i18n';

const NotificationsMenu = () => {
  const router = useRouter();
  const items = ApiClient.get('notifications');
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <BackButton
        title={i18n.t('Notifications')}
        onPress={() => dispatch(setTabActive('NotificationsMenu'))}
      />
      <ListView 
        data={items} 
        renderItem={({item, index}: ListItemProps) => {
          return (
            <TouchableOpacity 
              onPress={() => {
                console.log('clicked');
                /*
                router.push({
                  pathname: '/notification', 
                  params: {item: item},
                });
                */
              }}>
              <View style={styles.item}>
                <TextView>{item.label}</TextView>
              </View>
            </TouchableOpacity>
          );
        }}   
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  item: Layout.menuItem,
  label: Layout.menuItemLabel,
});

export default NotificationsMenu;
