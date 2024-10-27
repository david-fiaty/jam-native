import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { setSearchValue, setSearchFilter } from "@/redux/slices/SearchSlice";
import { Input } from '@rneui/themed';
import { Colors } from "@/constants/Colors";
import BoxView from '../view/BoxView';

const SearchField = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentStyle = {
    width: isExpanded ? 160 : 45,
  };

  return (
    <BoxView direction="row" align="space-between" style={[styles.container, currentStyle]}>
      <TouchableOpacity onPress={() => {
        dispatch(setActiveScreen('SearchView'));
        setTimeout(() => {
          setIsExpanded(!isExpanded);
        }, 0);
      }}>
        <Input 
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          rightIconContainerStyle={styles.rightIconContainerStyle}
          onChangeText={(text) => dispatch(setSearchValue(text))}
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