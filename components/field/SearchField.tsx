import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Config } from '@/constants/Config';
import * as Animatable from 'react-native-animatable';
import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";
import i18n from '@/translation/i18n';
import SpinnerView from '../view/SpinnerView';
import BoxView from '../view/BoxView';
import SearchManager from '@/manager/SearchManager';

const SearchField = () => {
  const searchState = useSelector((state: any) => state.search);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [debounceValue, setDebounceValue] = useState<any>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onChangeText = async (value: string) => {
    setIsProcessing(true);
    await SearchManager.loadResults(value);
    setIsProcessing(false);
  };

  const clearSearch = async () => {
    await onChangeText('');
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const renderRightIcon = () => {
    if (isProcessing) {
      return <SpinnerView size="small" />;
    }
    else if (searchState.searchValue?.length > 0) {
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
    const delayDebounce = setTimeout(() => {
      setDebounceValue(searchState.searchValue);
    }, Config.searchDebounceDuration);

    return () => clearTimeout(delayDebounce);
  }, [searchState]);

  useEffect(() => {
    if (debounceValue.length > 0) {
      (async () => {
        await onChangeText(debounceValue);
      })();
    }
  }, [debounceValue]);

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
          value={searchState.searchValue}
          placeholder={i18n.t('Search...')}
          onChangeText={onChangeText}
          rightIcon={renderRightIcon()}
          containerStyle={styles.fieldContainer}
        />
      </Animatable.View>

      {!searchState.searchValue?.length && (
        <Animatable.View
          style={[styles.searchIcon, styles.searchIconAnimate, (!isExpanded ? styles.searchIconVisible : {})]}
          transition="opacity"
          duration={isExpanded ? 100 : 1000}
        >
          <IconView
            name="search"
            theme="clear"
            size={22}
            padding={0}
            onPress={toggleSearch}
          />
        </Animatable.View>
      )}
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