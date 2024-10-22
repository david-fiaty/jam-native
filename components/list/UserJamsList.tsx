import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import { Layout } from '@/constants/Layout';

type Props = {
  data: object,
};

const UserJamsList = ({data}: Props) => {  
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <FlatList 
      data={data} 
      numColumns={4}
      contentContainerStyle={{gap: Layout.space.base}}
      columnWrapperStyle={{gap: Layout.space.base}}
      scrollEnabled={false}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity onPress={() => setSelectedOption(item.id)}>
            <View style={styles.container}>
              <View style={[styles.square, selectedOption == item.id ? styles.selected : {}]}>
                <IconView name={item.icon} theme="secondary" size={22} />
              </View>
              <TextView>{item.label}</TextView>   
            </View>
          </TouchableOpacity>
        );
      }}
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

export default UserJamsList;