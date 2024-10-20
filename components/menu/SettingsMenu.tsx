import { StyleSheet, FlatList } from 'react-native';
import TextBase from '../base/TextBase';
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
    <TextView>Settings menu</TextView>
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
  },
  list: {
    width: '100%',
  },
  item: {

  },
});
