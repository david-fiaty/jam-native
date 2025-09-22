import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { setSearchFilters, setSearchValue } from '@/redux/slices/SearchSlice';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import i18n from '@/translation/i18n';
import InputTextField from '../field/InputTextField';
import ButtonView from '../view/ButtonView';
import DividerView from '../view/DividerView';
import SearchManager from '@/manager/SearchManager';
import IconView from '../view/IconView';
import SpinnerView from '../view/SpinnerView';
import ModalManager from '@/manager/ModalManager';

const SearchFiltersForm = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isApplyProcessing, setIsApplyProcessing] = useState<boolean>(false);
  const [isResetProcessing, setIsResetProcessing] = useState<boolean>(false);
  const [currentFilters, setCurrentFilters] = useState<any>({});
  const [currentKeywords, setCurrentKeywords] = useState<string>('');
  const [filtersConfig, setFiltersConfig] = useState<any>({});
  const searchState = useSelector((state: any) => state.search, shallowEqual);

  const toggleFilters = (key: string) => {
    let searchFilters: any = { ...currentFilters };

    if (!searchFilters?.[key]?.length || searchFilters[key].length < filtersConfig[key].length) {
      searchFilters[key] = filtersConfig[key].map((o: any) => o.id);
    }
    else {
      searchFilters[key] = [];
    }

    setCurrentFilters(searchFilters);
  };

  const toggleFilter = (key: string, value: string) => {
    let searchFilters: any = { ...currentFilters };

    if (isFilterEnabled(key, value)) {
      searchFilters[key] = searchFilters[key].filter((v: any) => v != value);
    }
    else {
      searchFilters[key] = [...(searchFilters?.[key] || []), value];
    }

    setCurrentFilters(searchFilters);
  };

  const isFilterEnabled = (key: string, value: string) => {
    return Array.isArray(currentFilters?.[key]) && currentFilters[key].includes(value);
  };

  const applyFilters = async () => {
    setIsApplyProcessing(true);
    dispatch(setSearchFilters(currentFilters));
    dispatch(setSearchValue(currentKeywords));

    // Todo - Shouldn't this be removed, useless now?
    //await SearchManager.loadResults(currentKeywords, currentFilters);

    setIsApplyProcessing(false);
    ModalManager.toggleModal('SearchFiltersForm');
  };

  const resetFilters = async () => {
    setIsResetProcessing(true);
    setCurrentFilters({});
    setCurrentKeywords('');
    dispatch(setSearchFilters({}));

    // Todo - Shouldn't this be removed, useless now?
    //await SearchManager.loadResults();
    
    setIsResetProcessing(false);
  };

  const onKeywordsChange = async (value: string) => {
    setCurrentKeywords(value);
  };

  const clearKeywords = async () => {
    setCurrentKeywords('');
  };

  const renderAllFiltersTag = (key: string) => {
    let isEnabled: boolean = currentFilters?.[key]?.length === filtersConfig?.[key]?.length;

    return (
      <TouchableOpacity onPress={() => toggleFilters(key)}>
        <TextView
          style={isEnabled ? styles.filterTagEnabled : styles.filterTagDisabled}
        >
          {i18n.t('All')}
        </TextView>
      </TouchableOpacity>
    );
  };

  const renderFilterTag = (key: string, item: any) => {
    let isEnabled: any = isFilterEnabled(key, item.id);
    let onPress: any = () => toggleFilter(key, item.id);

    return (
      <TouchableOpacity key={item.id} onPress={onPress}>
        <TextView
          style={isEnabled ? styles.filterTagEnabled : styles.filterTagDisabled}
        >
          {item.name}
        </TextView>
      </TouchableOpacity>
    );
  };

  const renderKeywordsFilter = () => {
    let rightIcon: any = () => {
      if (currentKeywords?.length > 0) {
        return (
          <IconView
            name="delete"
            theme="secondary"
            size={18}
            padding={0}
            onPress={clearKeywords}
          />
        );
      }
    }

    return (
      <>
        <TextView style={styles.filterTitle}>
          {i18n.t('Keywords')}
        </TextView>
        <BoxView
          direction="row"
          align="flex-start"
          justify="flex-start"
          style={styles.filterContainer}
        >
          <InputTextField
            placeholder={i18n.t('Search keywords...')}
            onChangeText={onKeywordsChange}
            value={currentKeywords || ''}
            rightIcon={rightIcon()}
          />
        </BoxView>
      </>
    );
  };

  const renderCountriesFilter = () => {
    let key: string = 'countries';

    return (
      <>
        <TextView style={styles.filterTitle}>
          {i18n.t('Countries')}
        </TextView>
        <BoxView
          direction="row"
          align="flex-start"
          justify="flex-start"
          style={styles.filterContainer}
        >
          {renderAllFiltersTag(key)}
          {(filtersConfig.countries || []).map((item: any) => renderFilterTag(key, item))}
        </BoxView>
      </>
    );
  };

  const renderSectorsFilter = () => {
    let key: string = 'sectors';

    return (
      <>
        <TextView style={styles.filterTitle}>
          {i18n.t('Industries')}
        </TextView>
        <BoxView
          direction="row"
          align="flex-start"
          justify="flex-start"
          style={styles.filterContainer}
        >
          {renderAllFiltersTag(key)}
          {(filtersConfig.sectors || []).map((item: any) => renderFilterTag(key, item))}
        </BoxView>
      </>
    );
  };

  const renderSubSectorsFilter = () => {
    let key: string = 'subSectors';

    return (
      <>
        <TextView style={styles.filterTitle}>
          {i18n.t('Sub Industries')}
        </TextView>
        <BoxView
          direction="row"
          align="flex-start"
          justify="flex-start"
          style={styles.filterContainer}
        >
          {renderAllFiltersTag(key)}
          {((filtersConfig.sectors || [])
            .filter((o: any) => currentFilters.sectors.includes(o.id))
            .map((sector: any) => {
              return sector.sub_sectors.map((subSector: any) => renderFilterTag(key, subSector))
            })).flat()
          }
        </BoxView>
      </>
    );
  };

  const renderLocationTypesFilter = () => {
    let key: string = 'locationTypes';

    return (
      <>
        <TextView style={styles.filterTitle}>
          {i18n.t('Locations')}
        </TextView>
        <BoxView
          direction="row"
          align="flex-start"
          justify="flex-start"
          style={styles.filterContainer}
        >
          {renderAllFiltersTag(key)}
          {(filtersConfig.locationTypes || []).map((item: any) => renderFilterTag(key, item))}
        </BoxView>
      </>
    );
  };

  const renderJamTypesFilter = () => {
    let key: string = 'jamTypes';

    return (
      <>
        <TextView style={styles.filterTitle}>
          {i18n.t('Jam Types')}
        </TextView>
        <BoxView
          direction="row"
          align="flex-start"
          justify="flex-start"
          style={styles.filterContainer}
        >
          {renderAllFiltersTag(key)}
          {(filtersConfig.jamTypes || []).map((item: any) => renderFilterTag(key, item))}
        </BoxView>
      </>
    );
  };

  useEffect(() => {
    if (!isLoaded) {
      setFiltersConfig(SearchManager.getFiltersConfig())
      setCurrentKeywords(searchState.searchValue);
      setCurrentFilters(searchState.searchFilters);
      setIsLoaded(true);
    }
  }, [searchState, isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={[Layout.formContainer, styles.container]}
    >
      <BoxView direction="column" style={[Layout.formContainer, styles.formContainer]}>
        {renderKeywordsFilter()}
        {renderCountriesFilter()}
        {renderSectorsFilter()}
        {!!currentFilters?.sectors?.length && renderSubSectorsFilter()}
        {(!searchState.currentTab?.length || SearchManager.isJamTab(searchState.currentTab)) && renderJamTypesFilter() && renderLocationTypesFilter()}
      </BoxView>

      <DividerView theme="secondary" />

      <BoxView direction="row" align="center" justify="center" style={styles.actionsContainer}>
        <ButtonView
          label={i18n.t("Reset")}
          containerStyle={styles.actionsButton}
          theme="lightGray"
          onPress={resetFilters}
          isProcessing={isResetProcessing}
        />

        <ButtonView
          label={i18n.t("Apply")}
          containerStyle={styles.actionsButton}
          onPress={applyFilters}
          isProcessing={isApplyProcessing}
        />
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    maxWidth: '100%',
    flexShrink: 1,
    paddingTop: Layout.space.base,
  },
  filterContainer: {
    width: '100%',
    flexWrap: 'wrap',
    gap: Layout.space.base / 1.2,
    marginBottom: Layout.space.base * 1.2,
  },
  filterTitle: {
    color: Layout.colors.black,
    fontSize: 14,
  },
  filterTagDisabled: {
    backgroundColor: Layout.colors.lightGray,
    color: Layout.colors.primary,
    borderRadius: Layout.radius.round,
    paddingVertical: Layout.space.base / 1.5,
    paddingHorizontal: Layout.space.base,
  },
  filterTagEnabled: {
    backgroundColor: Layout.colors.primary,
    color: Layout.colors.white,
    borderRadius: Layout.radius.round,
    paddingVertical: Layout.space.base / 1.5,
    paddingHorizontal: Layout.space.base,
  },
  actionsContainer: {
    width: '100%',
    marginBottom: Layout.space.base * 2,
  },
  actionsButton: {
    width: '42%',
  },
});

export default SearchFiltersForm;
