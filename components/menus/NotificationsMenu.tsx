import { StyleSheet, View, FlatList, Text } from 'react-native';
import MenuItem from './MenuItem';
import ModalWindow from '../ModalWindow';
import { GlobalStyles } from '@/constants/GlobalStyles';

const NotificationsMenu = () => {  
  return (
    <View style={styles.container}>   
      <ModalWindow 
        label={<Text style={GlobalStyles.text}>20+</Text>}
        title="Notifications" 
        content={
          <FlatList 
            data={data} 
            horizontal={false}  
            style={styles.list}
            renderItem={({item, index}) => <MenuItem item={item} index={index} />} 
          />
        }
        animation="fade"
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
});

const data = [
  {
    'label': 'Lorem ipsum dolor sit amet',
    'path': '/jams',
  },
  {
    'label': 'Consectetur adipiscing elit',
    'path': '/jams',
  },
  {
    'label': 'Sed do eiusmod tempor',
    'path': '/jams',
  },
  {
    'label': 'Incididunt ut labore et dolore magna aliqua',
    'path': '/jams',
  },
  {
    'label': 'Ut enim ad minim veniam, quis nostrud',
    'path': '/jams',
  },
  {
    'label': 'Exercitation ullamco laboris nisi',
    'path': '/jams',
  },
  {
    'label': 'Excepteur sint occaecat cupidatat',
    'path': '/jams',
  },
];

export default NotificationsMenu;