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
        label={
          <TextBlock style={styles.icon}>{count}+</TextBlock>
        }
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

export default NotificationsScreen;