import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "@/constants/Layout";
import { StyleSheet, TouchableOpacity } from "react-native";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import i18n from '@/translation/i18n';
import { setSearchFilters } from '@/redux/slices/SearchSlice';

type Props = {

};

const SearchFiltersForm = ({ }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [sectorsData, setSectorsData] = useState<any[]>([]);
  const [currentFilters, setCurrentFilters] = useState<any>({});
  const [filtersConfig, setFiltersConfig] = useState<any>({});
  const appState = useSelector((state: any) => state.app);
  const searchState = useSelector((state: any) => state.search);

  const getFiltersConfig = () => {
    return {
      countries: appState.countriesData,
      sectors: appState.sectorsData,
    };
  };

  const toggleFilters = (key: string) => {
    let searchFilters: any = { ...currentFilters };

    if (searchFilters?.[key]?.length > 0) {
      searchFilters[key] = [];
    }
    else {
      searchFilters[key] = [...filtersConfig.countries].map((o: any) => o.id);
    }

    setCurrentFilters(searchFilters);
  };

  const toggleFilter = (key: string, value: string) => {
    let searchFilters: any = { ...currentFilters };

    if (isFilterEnabled(key, value)) {
      searchFilters[key] = searchFilters[key].filter((v: any) => v != value);
    }
    else {
      searchFilters[key] = [...searchFilters[key], value];
    }

    setCurrentFilters(searchFilters);
  };

  const isFilterEnabled = (key: string, value: string) => {
    return Array.isArray(currentFilters?.[key]) && currentFilters[key].includes(value);
  };

  const applyFilters = () => {
    dispatch(setSearchFilters(currentFilters));
  };

  const renderAllFiltersButton = (key: string) => {
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

  const renderCountriesFilters = () => {
    return (
      <>
        <TextView style={styles.filterTitle}>{i18n.t('Countries')}</TextView>
        <BoxView direction="row" align="flex-start" justify="flex-start" style={styles.countriesFilter}>
          {renderAllFiltersButton('countries')}

          {(filtersConfig.countries || []).map((o: any) => {
            let isEnabled: any = isFilterEnabled('countries', o.id);
            let onPress: any = () => toggleFilter('countries', o.id);

            return (
              <TouchableOpacity key={o.id} onPress={onPress}>
                <TextView
                  style={isEnabled ? styles.filterTagEnabled : styles.filterTagDisabled}
                >
                  {o.name}
                </TextView>
              </TouchableOpacity>
            );
          })}
        </BoxView>
      </>
    );
  };

  const renderSectorsFilter = () => {
    return <></>
  };

  const renderSubSectorsFilter = () => {
    return <></>
  };

  useEffect(() => {
    if (!isLoaded) {
      setFiltersConfig(getFiltersConfig())
      setCurrentFilters(searchState.searchFilters);
    }
  }, [searchState, isLoaded]);

  console.log(currentFilters);

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={[Layout.formContainer, styles.container]}
    >
      <BoxView direction="column" style={[Layout.formContainer, styles.formContainer]}>
        {renderCountriesFilters()}

        <TextView style={styles.filterTitle}>{i18n.t('Industries')}</TextView>
        <BoxView direction="row" align="flex-start" justify="flex-start" style={styles.countriesFilter}>
          {renderSectorsFilter()}
        </BoxView>

        <TextView style={styles.filterTitle}>{i18n.t('Sub Industries')}</TextView>
        <BoxView direction="row" align="flex-start" justify="flex-start" style={styles.countriesFilter}>
          {renderSubSectorsFilter()}
        </BoxView>
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
  countriesFilter: {
    width: '100%',
    flexWrap: 'wrap',
    marginBottom: Layout.space.base,
  },
  filterTitle: {
    color: Layout.colors.black,
    fontSize: 14,
  },
  filterTagDisabled: {
    backgroundColor: Layout.colors.gray,
    color: Layout.colors.primary,
    borderRadius: Layout.radius.round,
    paddingVertical: Layout.space.base,
    paddingHorizontal: Layout.space.base,
  },
  filterTagEnabled: {
    backgroundColor: Layout.colors.primary,
    color: Layout.colors.white,
    borderRadius: Layout.radius.round,
    paddingVertical: Layout.space.base,
    paddingHorizontal: Layout.space.base,
  },
});

export default SearchFiltersForm;
