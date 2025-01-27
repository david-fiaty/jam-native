import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from "@/redux/slices/SearchSlice";
import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";
import ScreenManager from "@/manager/ScreenManager";
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

  const openSearch = () => {
    ScreenManager.toggleModal('SearchView');
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
    <InputTextField 
      value={currentSearchValue}
      placeholder={i18n.t('Search...')}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      rightIcon={renderRightIcon()}
    /> 
  );
};

export default SearchField;