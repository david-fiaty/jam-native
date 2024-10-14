import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import TextBlock from '../base/TextBlock';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  data: object,
};

const SquareOptionsField = ({data}: Props) => {  
  return (
    <FlatList 
      data={data} 
      numColumns={4}
      contentContainerStyle={{gap: GlobalStyles.space}}
      columnWrapperStyle={{gap: GlobalStyles.space}}
      scrollEnabled={false}
      renderItem={({item, index}) => {
        return (
          <View style={styles.item}>
            <TextBlock>{item.id}</TextBlock>   
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
  },
  item: {
    backgroundColor: Colors.tertiary,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.tertiary,
    width: 72,
    height: 72,
  },
});

export default SquareOptionsField;
