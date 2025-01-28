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
    submitSearch(value); 
  };

  const clearSearch = () => {
    if (onSearchClear) onSearchClear();
  };

  const toggleSearch = () => {
    if (isExpanded && searchState.value?.length) {
      setCurrentSearchValue('');
      clearSearch();
    }
    else if (isExpanded && !searchState.value?.length) {
      setIsExpanded(false);
    }
    else if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const renderRightIcon = () => {
    return (
      <IconView 
        name="delete" 
        theme="primary" 
        size={13}
        onPress={toggleSearch}
      />
    );
  };

  return (
    <>
      { isExpanded &&
        <View style={styles.expanded}>
          <InputTextField 
            value={currentSearchValue}
            placeholder={i18n.t('Search...')}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            rightIcon={renderRightIcon()}
          /> 
        </View>
      }

      { !isExpanded &&
        <View style={styles.collapsed}>
          <IconView 
            name="search" 
            theme="clear" 
            size={22}
            padding={0}
            onPress={toggleSearch}
          />
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  expanded: {
    
  },
  collapsed: {

  },
});

export default SearchField;