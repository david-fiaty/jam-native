import { StyleSheet, View, FlatList, Text } from 'react-native';
import MenuItem from './MenuItem';
import ModalView from '../ModalView';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

const NotificationsMenu = () => {  
  return (
    <View style={styles.container}>   
      <ModalView 
        label={<Text style={[styles.icon]}>20+</Text>}
        title="Notifications" 
        menu={true}
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