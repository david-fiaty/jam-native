import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { setSearchValue, setSearchFilter } from "@/redux/slices/SearchSlice";
import { Input } from '@rneui/themed';
import { Colors } from "@/constants/Colors";
import BoxView from '../view/BoxView';
import IconView from "../view/IconView";

const SearchField = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentStyle = {
    width: isExpanded ? 160 : 30,
  };

  return (
    <BoxView direction="row" align="center" justify="flex-end" style={[styles.container, currentStyle]}>
      <TouchableOpacity onPress={() => {
        dispatch(setActiveScreen('SearchView'));
        setTimeout(() => {
          setIsExpanded(!isExpanded);
        }, 0);
      }}>
        <IconView name="search" theme="secondary" />
      </TouchableOpacity>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    //width: 45,
    backgroundColor: 'red',
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    //flexGrow: 0,
    //width: 45,
  },
  inputStyle: {
    borderBottomWidth: 0,
    flexGrow: 1,
  },
});

export default SearchField;