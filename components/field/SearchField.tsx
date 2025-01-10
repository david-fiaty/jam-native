import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, toggleSearchField } from "@/redux/slices/SearchSlice";
import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";
import ScreenManager from "@/manager/ScreenManager";
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';

const SearchField = () => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: any) => state.search);
  const [currentSearchValue, setCurrentSearchValue] = useState<any>('');
  const activeScreen = ScreenManager.getActiveScreen();
  const isExpanded = searchState.expanded === true;

  const onSubmitEditing = () => {
    dispatch(setSearchValue(currentSearchValue));
  };

  const toggleButton = (
    <IconView 
      name="search" 
      theme="clear" 
      size={18}
      padding={1}
      style={styles.iconContainer}
      onPress={() => {
        dispatch(toggleSearchField(true));
        ScreenManager.toggleScreen('SearchView');
      }}
    />
  );

  const inputField = (
    <InputTextField 
      value={currentSearchValue}
      placeholder={i18n.t('Search...')}
      containerStyle={styles.inputContainer} 
      onChangeText={(text: string) => setCurrentSearchValue(text)}
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
          }}
        />
      }
    /> 
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
  },
  inputContainer: {
    minWidth: 140,
    maxWidth: 188,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default SearchField;