import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from "@/redux/slices/SearchSlice";
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';

import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";
import i18n from '@/translation/i18n';
import SearchManager from '@/manager/SearchManager';
import DeviceManager from '@/manager/DeviceManager';

type Props = BaseProps & {
  onSearchComplete?: () => void;
};

const SearchField = ({ onSearchComplete }: Props) => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: any) => state.search);
  const [currentSearchValue, setCurrentSearchValue] = useState<any>('');

  const submitSearch = async (value?: string) => {
    dispatch(setSearchValue(value));
    await SearchManager.getSearchResult(null, value);
    if (onSearchComplete) onSearchComplete();
  };

  const onSubmitEditing = async () => {
    await submitSearch(currentSearchValue);
  };

  const onChangeText = async (value: string) => {
    setCurrentSearchValue(value);
    await submitSearch(value);
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
    width: DeviceManager.window.width - Layout.space.base*5.5, // Todo - Improve field width caclulation
  },
});


export default SearchField;