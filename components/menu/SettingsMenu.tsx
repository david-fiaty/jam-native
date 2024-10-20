import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { BaseProps } from '@/constants/Types';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { ListItemProps } from '@/constants/Types';

type ItemProps = {
  label: string,
  path: string,
};

const items: ItemProps[] = [
  {
    label: 'Account information',
    path: '/account',
  },
  {
    label: 'Change password',
    path: '/password',
  },
  {
    label: 'Language',
    path: '/language',
  },
];

export default ({style, children}: BaseProps) => {
  return (
    <View style={styles.container}>
      <ListView 
        data={items} 
        renderItem={({item, index}: ListItemProps) => {
          return (
            <TouchableOpacity>
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
