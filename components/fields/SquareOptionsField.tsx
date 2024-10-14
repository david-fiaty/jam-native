import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Touchable, TouchableOpacity } from 'react-native';
import TextBlock from '../base/TextBlock';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import StaticIcon from '../base/StaticIcon';

type Props = {
  data: object,
};

const SquareOptionsField = ({data}: Props) => {  
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <FlatList 
      data={data} 
      numColumns={4}
      contentContainerStyle={{gap: GlobalStyles.space}}
      columnWrapperStyle={{gap: GlobalStyles.space}}
      scrollEnabled={false}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity onPress={() => setSelectedOption(item.id)}>
            <View style={styles.container}>
              <View style={[styles.square, selectedOption == item.id ? styles.selected : {}]}>
                <StaticIcon name={item.icon} iconStyle={styles.icon} />
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
  square: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.tertiary,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.tertiary,
    width: 72,
    height: 72,
  },
  icon: {
    ...GlobalStyles.text,
    ...{
      fontSize: GlobalStyles.space*2,
    },
  },
  selected: {
    borderColor: Colors.primary,
  },
});

export default SquareOptionsField;
