import { StyleSheet, View, FlatList } from 'react-native';
import MenuItem from '@/components/base/MenuItem';
import ModalView from '@/components/base/ModalView';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ApiClient from '@/classes/ApiClient';
import TextBlock from '../base/TextBlock';

const NotificationsScreen = () => {  
  const data = ApiClient.get('notifications');
  const count = data.length;

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
    width: GlobalStyles.space*3,
    height: GlobalStyles.space*3,
    borderRadius: GlobalStyles.space*1.5,
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: GlobalStyles.space*1.2,
  },
});

export default NotificationsScreen;