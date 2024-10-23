import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import TextView from '../view/TextView';
import { Layout } from '@/constants/Layout';
import ApiClient from '@/classes/ApiClient';
import i18n from '@/translation/i18n';
import ImageView from '../view/ImageView';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';

const JamsList = () => {  
  const [selectedOption, setSelectedOption] = useState(null);
  const data = ApiClient.get('jams');

  return (
    <View style={styles.container}>
      <FlatList 
        data={data} 
        numColumns={1}
        scrollEnabled={true}
        renderItem={({item, index}) => {
          return (  
            <View style={styles.item}>
              <BoxView direction="row" align="center" justify="space-between" style={styles.itemHeader}>
                <BoxView>
                  <TextView>@{i18n.t('host')} +{item.host_count}</TextView>
                </BoxView>
                <BoxView>
                  <IconView name="actions" size={22} theme="clear" />
                </BoxView> 
              </BoxView>
              
              <ImageView source={item.image} resizeMode="cover" style={styles.itemImage} />

              <BoxView direction="row" align="center" justify="space-between" style={styles.itemToolbar}>
                <BoxView>
                  <TextView>@{i18n.t('host')} +{item.host_count}</TextView>
                </BoxView>
                <BoxView>
                  <IconView name="actions" size={22} theme="clear" />
                </BoxView> 
              </BoxView>

              <TextView>{item.id}</TextView>
              <TextView>{item.id}</TextView>
              <TextView>{item.id}</TextView>
              <TextView>{item.id}</TextView>
              <TextView>{item.id}</TextView>
            </View>
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
  item: {
    borderWidth: 1,
    borderRadius: Layout.radius.round,
    marginBottom: Layout.space.base,
    borderColor: Colors.primary,
  }, 
  itemHeader: {
    padding: Layout.space.base,
    marginBottom: 0,
  },
  itemToolbar: {
    padding: Layout.space.base,
    marginBottom: 0,
  },
  itemImage: {
    height: 300,
    backgroundColor: Colors.secondary,
  },
});

export default JamsList;