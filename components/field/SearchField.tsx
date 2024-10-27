import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { setSearchValue, setSearchFilter } from "@/redux/slices/SearchSlice";
import { Input } from '@rneui/themed';
import { Colors } from "@/constants/Colors";
import BoxView from '../view/BoxView';
import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";

const SearchField = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentStyle = {
    width: isExpanded ? 160 : 160,
  };

  return (
    <View direction="row" align="center" justify="flex-end" style={[styles.container, currentStyle]}>
      <InputTextField style={styles.input} />
      <IconView name="search" theme="secondary" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: '100%',
  },
  input: {
    //position: 'absolute',
    //top: 0,
    //left: 0,
    width: 50,
  },
  icon: {
    //position: 'absolute',
    //top: 0,
    //right: 0,
  },
});

export default SearchField;