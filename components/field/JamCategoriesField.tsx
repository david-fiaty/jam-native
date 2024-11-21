import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { Data } from '@/constants/Data';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import ListView from '../view/ListView';

const JamCategoriesField = () => {  
  const [selectedOption, setSelectedOption] = useState(null);
  const data = Data.jamCategories;

  const renderItem = (row: any) => (
    <TouchableOpacity onPress={() => setSelectedOption(row.item.id)}>
      <View style={styles.container}>
        <View style={[styles.square, selectedOption == row.item.id ? styles.selected : {}]}>
          <IconView name={row.item.icon} theme="secondary" />
        </View>
        <TextView>{row.item.label}</TextView>   
      </View>
    </TouchableOpacity>
  );

  return (
    <ListView 
      data={data} 
      numColumns={4}
      horizontal={false}
      scrollEnabled={false}
      contentContainerStyle={Layout.listContainer}
      columnWrapperStyle={Layout.listColumnWrapper}
      renderItem={(item: any) => renderItem(item)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: Layout.space.small,
  },
  square: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    padding: Layout.space.base,
    borderWidth: 1,
    borderRadius: Layout.radius.round,
    borderColor: Colors.secondary,
    width: Layout.space.base*7,
    height: Layout.space.base*7,
  },
  selected: {
    borderColor: Colors.primary,
  },
});

export default JamCategoriesField;