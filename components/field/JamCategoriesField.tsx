import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import ListView from '../view/ListView';

type Props = {
  data: object,
};

const JamCategoriesField = ({data}: Props) => {  
  const [selectedOption, setSelectedOption] = useState(null);

  const renderItem = (item, index) => (
    <TouchableOpacity onPress={() => setSelectedOption(item.id)}>
      <View style={styles.container}>
        <View style={[styles.square, selectedOption == item.id ? styles.selected : {}]}>
          <IconView name={item.icon} theme="secondary" />
        </View>
        <TextView>{item.label}</TextView>   
      </View>
    </TouchableOpacity>
  );

  return (
    <ListView 
      data={data} 
      numColumns={4}
      horizontal={false}
      contentContainerStyle={Layout.listContainer}
      columnWrapperStyle={Layout.listColumnWrapper}
      renderItem={({item, index}) => renderItem(item, index)}
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