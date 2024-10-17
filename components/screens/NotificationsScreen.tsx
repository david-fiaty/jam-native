import { StyleSheet, View, FlatList } from 'react-native';
import ModalView from '@/components/base/ModalView';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ApiClient from '@/classes/ApiClient';
import TextBlock from '../base/TextBlock';
import NotificationScreen from './NotificationScreen';

type NotificationProps = {
  item: object,
};

const NotificationsScreen = () => {  
  const data = ApiClient.get('notifications');
  const count = data.length < 100 ? data.length : 99;

  return (
    <View style={styles.container}>   
      <ModalView 
        title="Notifications" 
        animation="slide"
        label={<TextBlock style={styles.icon}>{count}+</TextBlock>}
        content={
          <FlatList 
            data={data} 
            horizontal={false}  
            style={styles.list}
            renderItem={({item, index}) => {
              return (
                <NotificationScreen menuItem={item} />
              );
            }} 
          />
        }
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  icon: {
    backgroundColor: Colors.tertiary,
    width: GlobalStyles.space.base*3,
    height: GlobalStyles.space.base*3,
    borderRadius: GlobalStyles.space.base*1.5,
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: GlobalStyles.space.base*1.2,
  },
});

export default NotificationsScreen;