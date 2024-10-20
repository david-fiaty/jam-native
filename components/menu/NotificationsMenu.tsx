import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { BaseProps } from '@/constants/Types';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { ListItemProps } from '@/constants/Types';
import ApiClient from '@/classes/ApiClient';

export default ({style, children}: BaseProps) => {
  const items = ApiClient.get('notifications');

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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: Layout.space.base,
    borderBottomWidth: 0.76,
    borderBottomColor: Colors.primary,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
