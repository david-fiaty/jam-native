import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";
import i18n from '@/translation/i18n';
import DeviceManager from '@/manager/DeviceManager';

type Props = BaseProps & {
  onSearchSubmit?: (value: any) => void;
  onSearchClear?: () => void;
};

const SearchField = ({ onSearchSubmit, onSearchClear }: Props) => {
  const searchState = useSelector((state: any) => state.search);
  const [currentSearchValue, setCurrentSearchValue] = useState<any>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const submitSearch = (value?: string) => {
    if (onSearchSubmit) onSearchSubmit(value);
  };

  const onSubmitEditing = () => {
    submitSearch(currentSearchValue);
  };

  const onChangeText = (value: string) => {
    setCurrentSearchValue(value);
    //submitSearch(value); // Todo - Fix keyboard disappearing or remove
  };

  const clearSearch = () => {
    if (onSearchClear) onSearchClear();
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const renderRightIcon = () => {
    return (
      <IconView 
        name="delete" 
        theme="primary" 
        size={13}
        onPress={searchState.value.length > 0 ? clearSearch : toggleSearch}
      />
    );
  };

  //console.log('stateValue', searchState.value);

  //console.log('currentSearchValue', currentSearchValue);

  return (
    <View style={styles.container}>
      <InputTextField 
        value={currentSearchValue || searchState.value}
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
    //width: '100%',
  },
});

export default SearchField;