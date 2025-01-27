import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from "@/redux/slices/SearchSlice";
import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";
import i18n from '@/translation/i18n';
import SearchManager from '@/manager/SearchManager';

const SearchField = () => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: any) => state.search);
  const [currentSearchValue, setCurrentSearchValue] = useState<any>('');

  const onSubmitEditing = async () => {
    dispatch(setSearchValue(currentSearchValue));
    await SearchManager.loadData(currentSearchValue);
  };

  const onChangeText = async (value: string) => {
    setCurrentSearchValue(value);
    dispatch(setSearchValue(value));
    await SearchManager.loadData(value);
  };

  const clearSearch = () => {
    setCurrentSearchValue('');
    dispatch(setSearchValue(''));
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

    return <></>;
  };

  return (
    <View style={styles.container}>
    <InputTextField 
      value={currentSearchValue}
      placeholder={i18n.t('Search...')}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      rightIcon={renderRightIcon()}
    /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});


export default SearchField;