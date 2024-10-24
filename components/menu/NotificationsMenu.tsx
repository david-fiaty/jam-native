import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { BaseProps } from '@/constants/Types';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import { Layout } from '@/constants/Layout';
import { ListItemProps } from '@/constants/Types';
import ApiClient from '@/classes/ApiClient';

const NotificationsMenu = ({style, children}: BaseProps) => {
  const router = useRouter();
  const items = ApiClient.get('notifications');

  return (
    <View style={styles.container}>
      <ListView 
        data={items} 
        renderItem={({item, index}: ListItemProps) => {
          return (
            <TouchableOpacity 
              onPress={() => {
                router.push({
                  pathname: '/notification', 
                  params: item,
                });
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
