import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import TextView from '../view/TextView';
import { Layout } from '@/constants/Layout';
import ApiClient from '@/classes/ApiClient';
import i18n from '@/translation/i18n';
import ImageView from '../view/ImageView';
import BoxView from '../view/BoxView';

const JamsList = () => {  
  const [selectedOption, setSelectedOption] = useState(null);
  const data = ApiClient.get('jams');

  return (
    <View style={styles.container}>
      <FlatList 
        data={data} 
        numColumns={1}
        contentContainerStyle={{gap: Layout.space.base}}
        scrollEnabled={true}
        renderItem={({item, index}) => {
          return (  
            <BoxView direction="column" style={styles.item}>
              <ImageView source={item.image} />
              <TextView>{item.id}</TextView>
              <TextView>{item.id}</TextView>
              <TextView>{item.id}</TextView>
              <TextView>{item.id}</TextView>
              <TextView>{item.id}</TextView>
            </BoxView>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    padding: Layout.space.base,
    borderWidth: 1,
    borderRadius: Layout.radius.round,
    borderColor: Colors.secondary,
  },
  selected: {
    borderColor: Colors.primary,
  },
});

export default JamsList;