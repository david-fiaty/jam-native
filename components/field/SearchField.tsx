import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, toggleSearchField } from "@/redux/slices/SearchSlice";
import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";
import ScreenManager from "@/manager/ScreenManager";
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SearchManager from '@/manager/SearchManager';

const SearchField = () => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: any) => state.search);
  const [currentSearchValue, setCurrentSearchValue] = useState<any>('');
  const activeScreen = ScreenManager.getActiveScreen();
  const isExpanded = searchState.expanded === true;

  const onSubmitEditing = async () => {
    dispatch(setSearchValue(currentSearchValue));
    await SearchManager.loadData(currentSearchValue);
  };

  const onChangeText = (value: string) => {
    setCurrentSearchValue(value);
    dispatch(setSearchValue(value));
  };

  const toggleButton = (
    <IconView 
      name="search" 
      theme="clear" 
      size={22}
      padding={0}
      style={styles.iconContainer}
      onPress={() => {
        dispatch(toggleSearchField(true));
        ScreenManager.toggleScreen('SearchView');
      }}
    />
  );

  const inputField = (
    <View style={styles.inputContainer}>
      <InputTextField 
        value={currentSearchValue}
        placeholder={i18n.t('Search...')}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        rightIcon={  
          <IconView 
            name="delete" 
            theme="primary" 
            size={13}
            onPress={() => {
              if (searchState.value.length && activeScreen?.name == 'SearchView') {
                setCurrentSearchValue('');
                dispatch(setSearchValue(''));
              }
              else if (!searchState.value.length && activeScreen?.name == 'SearchView') {
                dispatch(toggleSearchField(false));
                ScreenManager.toggleScreen('SearchView');
              }
              else if (!searchState.value.length && activeScreen?.name != 'SearchView') {
                dispatch(toggleSearchField(false));
              }
            }}
          />
        }
      /> 
    </View>
  );

  return (
    <BoxView direction="row" align="center" justify="space-between" style={styles.container}>
      { isExpanded ? inputField : toggleButton }
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  inputContainer: {
    minWidth: 140,
    maxWidth: 188,
  },
  iconContainer: {
    //position: 'absolute',
    //top: 0,
    //right: 50,
  },
});

export default SearchField;