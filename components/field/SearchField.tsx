import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { setSearchValue, setSearchFilter, toggleSearchField } from "@/redux/slices/SearchSlice";
import { Input } from '@rneui/themed';
import { Colors } from "@/constants/Colors";
import BoxView from '../view/BoxView';
import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";
import ScreenManager from "@/classes/ScreenManager";

const SearchField = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const searchState = useSelector((state) => state.search);
  const screenState = useSelector((state) => state.screen);

  const toggleButton = (
    <IconView 
      name="search" 
      theme="secondary" 
      style={styles.iconContainer}
      onPress={() => {
        //dispatch(setActiveScreen('SearchView'));
        dispatch(toggleSearchField(!isExpanded));

        setTimeout(() => {
          setIsExpanded(!isExpanded);
        }, 0);
      }}
    />
  );

  const searchField = (
    <InputTextField 
      containerStyle={styles.inputContainer} 
      rightIcon={  
        <IconView 
          name="delete" 
          theme="primary" 
          onPress={() => {
            //dispatch(setActiveScreen('SearchView'));
            dispatch(toggleSearchField(!isExpanded));
    
            setTimeout(() => {
              setIsExpanded(!isExpanded);
            }, 0);
          }}
        />
      }
    /> 
  );

console.log(searchState);
//console.log(ScreenManager.getActiveScreen(screenState));

  return (
    <View direction="row" align="center" justify="space-between" style={styles.container}>
      { isExpanded ? searchField : toggleButton }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    minWidth: 140,
    maxWidth: 160,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default SearchField;