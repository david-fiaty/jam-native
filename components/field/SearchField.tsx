import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { setSearchValue, setSearchFilter } from "@/redux/slices/SearchSlice";
import { Input } from '@rneui/themed';
import { Colors } from "@/constants/Colors";
import BoxView from '../view/BoxView';
import IconView from "../view/IconView";
import InputTextBase from "../base/InputTextBase";

const SearchField = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentStyle = {
    width: isExpanded ? 160 : 160,
  };

  return (
    <BoxView direction="row" align="center" justify="flex-end" style={[styles.container, currentStyle]}>
      <InputTextBase />

        <IconView name="search" theme="secondary" />

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    //width: 45,
    backgroundColor: 'red',
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default SearchField;