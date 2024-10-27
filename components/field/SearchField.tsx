import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { setSearchValue, setSearchFilter, toggleSearchField } from "@/redux/slices/SearchSlice";
import { Input } from '@rneui/themed';
import { Colors } from "@/constants/Colors";
import BoxView from '../view/BoxView';
import IconView from "../view/IconView";
import InputTextField from "../field/InputTextField";
import ScreenManager from "@/classes/ScreenManager";
import i18n from '@/translation/i18n';

const SearchField = () => {
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search);
  const screenState = useSelector((state) => state.screen);
  const activeScreen = ScreenManager.getActiveScreen(screenState);
  const isExpanded = searchState.expanded === true;

  const toggleButton = (
    <IconView 
      name="search" 
      theme="secondary" 
      style={styles.iconContainer}
      onPress={() => {
        dispatch(toggleSearchField(true));
        dispatch(setActiveScreen('SearchView'));
      }}
    />
  );

  const inputField = (
    <InputTextField 
      value={searchState.value}
      placeholder={i18n.t('Search...')}
      containerStyle={styles.inputContainer} 
      onChangeText={(text) => dispatch(setSearchValue(text))}
      rightIcon={  
        <IconView 
          name="delete" 
          theme="primary" 
          size={16}
          onPress={() => {
            if (searchState.value.length) {
              dispatch(setSearchValue(''));
            }
            else if (!searchState.value.length && activeScreen?.name == 'SearchView') {
              dispatch(toggleSearchField(false));
              dispatch(setActiveScreen('SearchView'));
            }
          }}
        />
      }
    /> 
  );

  return (
    <View direction="row" align="center" justify="space-between" style={styles.container}>
      { isExpanded ? inputField : toggleButton }
    </View>
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