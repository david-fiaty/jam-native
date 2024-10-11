import { StyleSheet, View, FlatList, Text } from 'react-native';
import MenuItem from '@/components/menus/MenuItem';
import ModalView from '@/components/ModalView';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ApiClient from '@/classes/ApiClient';
import NotificationsIcon from '../icons/NotificationsIcon';

const NotificationsMenu = () => {  
  const data = ApiClient.get('notifications');

  return (
    <View style={styles.container}>   
      <ModalView 
        title="Notifications" 
        label={<NotificationsIcon count={20}/>}
        content={
          <FlatList 
            data={data} 
            horizontal={false}  
            style={styles.list}
            renderItem={({item, index}) => <MenuItem item={item} index={index} />} 
          />
        }
        animation="slide"
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  list: {
    width: '100%',
  },
  icon: {
    ...GlobalStyles.text,
    ...GlobalStyles.icon,
    ...{
      backgroundColor: Colors.tertiary,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 40,
    },
  },
});

export default NotificationsMenu;