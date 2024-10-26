import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from '@rneui/themed';
import { Colors } from "@/constants/Colors";
import BoxView from '../view/BoxView';

const SearchField = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentStyle = {
    width: isExpanded ? 160 : 45,
  };

  return (
    <BoxView direction="row" align="space-between" style={[styles.container, currentStyle]}>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Input 
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          rightIconContainerStyle={styles.rightIconContainerStyle}
          rightIcon={{
            type: 'ionicons', 
            name: 'search',
            color: Colors.primary,
          }}
        />
      </TouchableOpacity>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 45,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    flexGrow: 0,
  },
  inputStyle: {
    borderBottomWidth: 0,
    flexGrow: 1,
  },
  rightIconContainerStyle: {
    
  },
});

export default SearchField;