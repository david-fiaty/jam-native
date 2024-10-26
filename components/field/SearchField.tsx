import React, { useState } from "react";
import { StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';
import { Layout } from '@/constants/Layout';

const SearchField = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expandedStyle = {

  };

  return (
    <BoxView direction="row" align="space-between" style={styles.container}>
      <Input 
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        rightIconContainerStyle={styles.rightIconContainerStyle}
        rightIcon={
          <IconView 
            name="search" 
            theme="clear" 
            onPress={() => setIsExpanded(!isExpanded)}
          />
        }
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Layout.header.width/6,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    flexGrow: 1,
  },
  inputStyle: {
    borderBottomWidth: 0,
    flexGrow: 1,
  },
  rightIconContainerStyle: {
    //backgroundColor: 'blue',
    marginRight: -Layout.space.base,
  },
});

export default SearchField;