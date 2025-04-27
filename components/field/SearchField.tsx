import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BaseProps } from '@/constants/Types';
import * as Animatable from 'react-native-animatable';
import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";
import i18n from '@/translation/i18n';
import SpinnerView from '../view/SpinnerView';
import BoxView from '../view/BoxView';
import SearchManager from '@/manager/SearchManager';

type Props = BaseProps & {
  onSearchEdit?: (value: any) => void;
  onSearchSubmit?: (value: any) => void;
  onSearchClear?: () => void;
};

const SearchField = ({ onSearchEdit, onSearchSubmit, onSearchClear }: Props) => {
  const searchState = useSelector((state: any) => state.search);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentSearchValue, setCurrentSearchValue] = useState<any>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onChangeText = (value: string) => {
    setCurrentSearchValue(value);
    submitSearch(value); 
  };

  const onSubmitEditing = () => {
    if (onSearchEdit) onSearchEdit(currentSearchValue);
  };

  const submitSearch = async (value?: string) => {
    await SearchManager.loadSearchResults(value);
  };

  const clearSearch = async () => {
    await SearchManager.clearSearch();
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const renderRightIcon = () => {
    if (searchState.searching == true) {
      return <SpinnerView size="small" />;
    }
    else if (searchState.value?.length) {
      return (
        <IconView 
          name="delete" 
          theme="secondary" 
          size={18}
          padding={0}
          onPress={clearSearch}
        />
      );
    }
    else {
      return (
        <IconView 
          name="next" 
          theme="secondary" 
          size={18}
          padding={0}
          onPress={toggleSearch}
        />
      );
    }
  };

  useEffect(() => {
    (async () => {    
      if (!isLoaded) {
        await SearchManager.loadSearchResults();
        setIsLoaded(true);
      }
    })();

  }, [isLoaded]);

  return (
    <BoxView 
      direction="row" 
      align="center" 
      justify="flex-end" 
      style={styles.container}
    >
      <Animatable.View 
        style={[styles.fieldInput, styles.fieldAnimate, (isExpanded ? styles.fieldExpanded : {})]}
        transition="width"
        duration={isExpanded ? 300 : 600}
      >
        <InputTextField 
          value={currentSearchValue}
          placeholder={i18n.t('Search...')}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          rightIcon={renderRightIcon()}
          containerStyle={styles.fieldContainer}
        /> 
      </Animatable.View>

      <Animatable.View 
        style={[styles.searchIcon, styles.searchIconAnimate, (!isExpanded ? styles.searchIconVisible : {})]}
        transition="opacity"
        duration={isExpanded ? 100: 1000}
      >      
        <IconView 
          name="search" 
          theme="clear" 
          size={22}
          padding={0}
          onPress={toggleSearch}
        /> 
      </Animatable.View>

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  fieldInput: {
    position: 'absolute',
    right: 0,
  },
  fieldAnimate: {
    overflow: 'hidden',
    width: '0%',
  },
  fieldExpanded: {
    width: '100%',
  },
  fieldContainer: {
    height: 35,
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
  },
  searchIconAnimate: {
    opacity: 0,
  },
  searchIconVisible: {
    opacity: 1,
  },
});

export default SearchField;