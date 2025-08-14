import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { setSearchFilters } from '@/redux/slices/SearchSlice';
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import i18n from '@/translation/i18n';
import InputTextField from '../field/InputTextField';
import EntityManager from '@/manager/EntityManager';

type Props = {

};

const SearchFiltersForm = ({ }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentFilters, setCurrentFilters] = useState<any>({});
  const [filtersConfig, setFiltersConfig] = useState<any>({});
  const appState = useSelector((state: any) => state.app);
  const searchState = useSelector((state: any) => state.search);

  const getFiltersConfig = () => {
    return [
      {
        key: 'countries',
        label: i18n.t('Countries'),
        data: appState.countriesData,
        render: (item: any) => {
          return item.data.map((o: any) => renderFilterTag(o));
        },
      },
      {
        key: 'sectors',
        label: i18n.t('Industries'),
        data: appState.sectorsData,
        render: (item: any) => {
          return item.data.map((o: any) => renderFilterTag(o))
        },
      },
      {
        key: 'subSectors',
        label: i18n.t('Sub Industries'),
        data: ([...appState.sectorsData].map((sector: any) => sector.sub_sectors)).flat(),
        render: (item: any) => {
          if (!!currentFilters?.sectors?.length) {
            return (item.data.filter((o: any) => currentFilters.sectors.includes(o.id))
              .map((sector: any) => {
                return sector.sub_sectors.map((o: any) => renderFilterTag(o))
              })).flat();
          }
        },
      },
      {
        key: 'jamTypes',
        label: i18n.t('Jam Types'),
        data: EntityManager.getJamTypes(),
        render: (item: any) => {
          return item.data.map((o: any) => renderFilterTag(o));
        },
      },
    ];
  };

  const renderFilters = () => {
    return getFiltersConfig().map((item: any) => {
      return (
        <>
          <TextView style={styles.filterTitle}>
            {item.label}
          </TextView>
          <BoxView
            direction="row"
            align="flex-start"
            justify="flex-start"
            style={styles.filterContainer}
          >
            {renderAllFiltersTag(item)}
            {item.render(item)}
          </BoxView>
        </>
      );
    });
  };

  const toggleFilters = (item: any) => {
    let searchFilters: any = { ...currentFilters };

    if (!searchFilters?.[item.key]?.length || searchFilters[item.key].length < filtersConfig[item.key].length) {
      searchFilters[item.key] = filtersConfig[item.key].map((o: any) => o.id);
    }
    else {
      searchFilters[item.key] = [];
    }

    setCurrentFilters(searchFilters);
  };

  const toggleFilter = (item: any) => {
    let searchFilters: any = { ...currentFilters };

    if (isFilterEnabled(item.key)) {
      searchFilters[item.key] = searchFilters[item.key].filter((v: any) => v != value);
    }
    else {
      searchFilters[item.key] = [...(searchFilters?.[item.key] || []), value];
    }

    setCurrentFilters(searchFilters);
  };

  const isFilterEnabled = (item: any) => {
    return Array.isArray(currentFilters?.[item.key]) && currentFilters[item.key].includes(value);
  };

  const applyFilters = () => {
    dispatch(setSearchFilters(currentFilters));
  };

  const renderAllFiltersTag = (item: any) => {
    let isEnabled: boolean = currentFilters?.[item.key]?.length === filtersConfig?.[item.key]?.length;

    return (
      <TouchableOpacity onPress={() => toggleFilters(item)}>
        <TextView
          style={isEnabled ? styles.filterTagEnabled : styles.filterTagDisabled}
        >
          {i18n.t('All')}
        </TextView>
      </TouchableOpacity>
    );
  };

  const renderFilterTag = (item: any) => {
    let isEnabled: any = isFilterEnabled(item);
    let onPress: any = () => toggleFilter(item);

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

  useEffect(() => {
    if (!isLoaded) {
      setFiltersConfig(getFiltersConfig())
      setCurrentFilters(searchState.searchFilters);
      setIsLoaded(true);
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
        {renderFilters()}
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
    marginBottom: Layout.space.base * 1.4,
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
