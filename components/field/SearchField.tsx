import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BaseProps } from '@/constants/Types';
import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";
import i18n from '@/translation/i18n';
import SpinnerView from '../view/SpinnerView';
import BoxView from '../view/BoxView';

type Props = BaseProps & {
  onSearchEdit?: (value: any) => void;
  onSearchSubmit?: (value: any) => void;
  onSearchClear?: () => void;
};

const SearchField = ({ onSearchEdit, onSearchSubmit, onSearchClear }: Props) => {
  const searchState = useSelector((state: any) => state.search);
  const [currentSearchValue, setCurrentSearchValue] = useState<any>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
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
    else {
      return (
        <IconView 
          name="exit" 
          theme="primary" 
          size={13}
          onPress={toggleSearch}
        />
      );
    }
  };

  return (
    <BoxView 
      direction="row" 
      align="center" 
      justify="flex-end" 
      style={styles.container}
    >
      {!isExpanded && 
        <IconView 
          name="search" 
          theme="clear" 
          size={22}
          padding={0}
          onPress={toggleSearch}
        /> 
      }

      {isExpanded && 
        <InputTextField 
          value={currentSearchValue}
          placeholder={i18n.t('Search...')}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          rightIcon={renderRightIcon()}
        /> 
      }
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default SearchField;