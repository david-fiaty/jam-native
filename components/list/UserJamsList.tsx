import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import { Layout } from '@/constants/Layout';
import ApiClient from '@/classes/ApiClient';

const UserJamsList = () => {  
  const [selectedOption, setSelectedOption] = useState(null);
  const data = ApiClient.get('jams');

  return (
    <View style={styles.container}>
      <TextView style={styles.title}>Your Jams</TextView>
      <FlatList 
        data={data} 
        numColumns={3}
        contentContainerStyle={{gap: Layout.space.base}}
        columnWrapperStyle={{gap: Layout.space.base}}
        scrollEnabled={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => setSelectedOption(item.id)}>
              <View style={styles.item}>
                <View style={[styles.square, selectedOption == item.id ? styles.selected : {}]}>
                  <TextView>{item.id}</TextView>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: Layout.space.base,
  },
  item: {
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
    width: Layout.space.base*10,
    height: Layout.space.base*10,
  },
  selected: {
    borderColor: Colors.primary,
  },
});

export default UserJamsList;