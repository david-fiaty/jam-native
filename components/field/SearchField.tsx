import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BaseProps } from '@/constants/Types';
import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";
import i18n from '@/translation/i18n';
import SpinnerView from '../view/SpinnerView';

type Props = BaseProps & {
  onSearchEdit?: (value: any) => void;
  onSearchSubmit?: (value: any) => void;
  onSearchClear?: () => void;
};

const SearchField = ({ onSearchEdit, onSearchSubmit, onSearchClear }: Props) => {
  const searchState = useSelector((state: any) => state.search);
  const [currentSearchValue, setCurrentSearchValue] = useState<any>('');

  const submitSearch = (value?: string) => {
    if (onSearchSubmit) onSearchSubmit(value);
  };

  const onSubmitEditing = () => {
    if (onSearchEdit) onSearchEdit(currentSearchValue);
  };

  const onChangeText = (value: string) => {
    setCurrentSearchValue(value);
    submitSearch(value); 
  };

  const clearSearch = () => {
    setCurrentSearchValue('');
    if (onSearchClear) onSearchClear();
  };

  const renderRightIcon = () => {
    if (searchState.searching == true) {
      return <SpinnerView size="small" compact={true} />;
    }
    else if (searchState.value?.length) {
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