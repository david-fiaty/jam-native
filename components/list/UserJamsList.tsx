import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import TextView from '../view/TextView';
import { Layout } from '@/constants/Layout';
import ApiClient from '@/classes/ApiClient';
import i18n from '@/translation/i18n';
import ImageView from '../view/ImageView';

const UserJamsList = () => {  
  const [selectedOption, setSelectedOption] = useState(null);
  const data = ApiClient.get('jams');

  return (
    <View style={styles.container}>
      <TextView style={styles.title}>{i18n.t('Your Jams')}</TextView>
      <FlatList 
        data={data} 
        numColumns={3}
        contentContainerStyle={{gap: Layout.space.base}}
        columnWrapperStyle={{gap: Layout.space.base}}
        scrollEnabled={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity>
              <View style={styles.item}>
                <ImageView 
                  source={item.image} 
                  width="100%"
                  height="100%"
                  resizeMode="cover"
                  style={styles.image}
                />
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
  image: {
    borderRadius: Layout.space.base,
    width: 96.7,
    height: 96.7,
  },
});

export default UserJamsList;