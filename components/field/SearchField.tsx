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