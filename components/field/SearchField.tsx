import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, toggleSearchField } from "@/redux/slices/SearchSlice";
import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";
import ScreenManager from "@/manager/ScreenManager";
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SearchManager from '@/manager/SearchManager';

const SearchField = () => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: any) => state.search);
  const [currentSearchValue, setCurrentSearchValue] = useState<any>('');
  const activeScreen = ScreenManager.getActiveScreen();
  const isExpanded = searchState.expanded === true;

  const onSubmitEditing = async () => {
    dispatch(setSearchValue(currentSearchValue));
    await SearchManager.loadData(currentSearchValue);
  };

  const onChangeText = (value: string) => {
    setCurrentSearchValue(value);
    dispatch(setSearchValue(value));
  };

  const clearSearch = () => {
    setCurrentSearchValue('');
    dispatch(setSearchValue(''));
  };

  const openSearch = () => {
    ScreenManager.toggleScreen('SearchView');
  };

  const renderRightIcon = () => {
    if (searchState.value.length > 0) {
      return (
        <IconView 
          name="delete" 
          theme="primary" 
          size={13}
          onPress={clearSearch}
        />
      );
    }
    else if (activeScreen?.name != 'SearchView') {
      return (
        <IconView 
          name="search" 
          theme="secondary" 
          size={18}
          padding={0}
          onPress={openSearch}
        />
      );
    }

    return <></>;
  };

  const toggleButton = (
    <IconView 
      name="search" 
      theme="clear" 
      size={22}
      padding={0}
      onPress={() => {
        dispatch(toggleSearchField(true));
        openSearch();
      }}
    />
  );

  const inputField = (
    <View style={styles.inputContainer}>
      <InputTextField 
        value={currentSearchValue}
        placeholder={i18n.t('Search...')}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        rightIcon={renderRightIcon()}
      /> 
    </View>
  );

  return (
    <BoxView direction="row" align="center" justify="space-between" style={styles.container}>
      { isExpanded && inputField}
      { !isExpanded && toggleButton}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  inputContainer: {
    minWidth: 140,
    maxWidth: 188,
  },
});

export default SearchField;