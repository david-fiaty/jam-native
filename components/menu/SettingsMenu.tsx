import { StyleSheet, View, FlatList } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from '../view/TextView';

const items = [
  {
    'label': 'Account information',
    'path': '/account',
  },
  {
    'label': 'Change password',
    'path': '/password',
  },
  {
    'label': 'Language',
    'path': '/language',
  },
];

export default ({style, children}: BaseProps) => {
  return (
    <View style={styles.container}>
      <TextView>Settings menu</TextView>
    </View>
  );

  /*
  return (
    <FlatList 
      data={items} 
      horizontal={false}  
      style={styles.list}
      renderItem={({item, index}) => {
        return (
          <TextView>{item.label}</TextView>
        );
      }} 
    />
  );
  */
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: 'yellow',
  },
  list: {
    width: '100%',
  },
  item: {

  },
});
