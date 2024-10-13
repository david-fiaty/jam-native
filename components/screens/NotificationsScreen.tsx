import { StyleSheet, View, FlatList } from 'react-native';
import MenuItem from '@/components/base/MenuItem';
import ModalView from '@/components/base/ModalView';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ApiClient from '@/classes/ApiClient';
import TextBlock from '../base/TextBlock';

const NotificationsScreen = () => {  
  const data = ApiClient.get('notifications');
  const count = 22;

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
            renderItem={({item, index}) => <MenuItem item={item} index={index} />} 
          />
        }
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  icon: {
    backgroundColor: Colors.tertiary,
    borderRadius: 16,
    height: 32,
    minWidth: 32,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});

export default NotificationsScreen;