import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Touchable, TouchableOpacity } from 'react-native';
import TextBlock from '../base/TextBlock';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import StaticIcon from '../base/StaticIcon';

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
          <TouchableOpacity onPress={() => console.log('clicked')}>
            <View style={styles.container}>
              <View style={styles.item.square}>
                <StaticIcon name={item.icon} />
              </View>
              <TextBlock>{item.label}</TextBlock>   
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: GlobalStyles.space/2,
  },
  item: {
    square: {
      backgroundColor: Colors.tertiary,
      padding: 10,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: Colors.tertiary,
      width: 72,
      height: 72,
    },
    icon: {

    },
  },
});

export default SquareOptionsField;
