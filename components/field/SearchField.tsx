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

  const toggleButton = (
    <IconView 
      name="search" 
      theme="clear" 
      size={20}
      style={styles.iconContainer}
      onPress={() => {
        dispatch(toggleSearchField(true));
        ScreenManager.toggleModal('SearchView');
      }}
    />
  );

  const inputField = (
    <InputTextField 
      value={currentSearchValue}
      placeholder={i18n.t('Search...')}
      containerStyle={styles.inputContainer} 
      onChangeText={(text: string) => setCurrentSearchValue(text)}
      onSubmitEditing={() => dispatch(setSearchValue(currentSearchValue))}
      rightIcon={  
        <IconView 
          name="delete" 
          theme="primary" 
          size={10}
          onPress={() => {
            if (searchState.value.length && activeScreen?.name == 'SearchView') {
              dispatch(setSearchValue(''));
            }
            else if (activeScreen?.name != 'SearchView') {
              dispatch(setSearchValue(''));
              ScreenManager.toggleModal('SearchView');
            }
            else if (!searchState.value.length && activeScreen?.name == 'SearchView') {
              dispatch(toggleSearchField(false));
              ScreenManager.toggleModal('SearchView');
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