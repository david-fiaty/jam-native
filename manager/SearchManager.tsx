import { setTabResults } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';
import i18n from "@/translation/i18n";

class SearchManager {
  async loadResults(tabId: string, currentPage: number, pageSize?: any, applyFilters?: boolean) {
    // Variables
    let searchState: any = Store.getState().search;
    let searchValue: any = searchState.searchValue;
    let currentFilters: any = searchState.searchFilters;
    let currentTab: any = this.getSearchTab(tabId);
    let payload: any = {};
    let results: any = {};

    // Apply filters
    applyFilters = applyFilters === false ? false : true;

    // Current page
    payload = {
      ...payload,
      ...{ page: currentPage },
    };

    // Page size
    if (pageSize) {
      payload = {
        ...payload,
        ...{ page_size: pageSize },
      };
    }

    // Search value
    if (applyFilters && searchValue?.length) {
      payload = {
        ...payload,
        ...{
          query_text: searchValue,
          query_title: searchValue,
        },
      };
    }

    // Countries filter
    if (applyFilters && currentFilters?.countries?.length > 0) {
      payload = {
        ...payload,
        ...{ query_countries_codes: currentFilters.countries.join(',') },
      };
    }

    // Sectors filter
    if (applyFilters && currentFilters?.sectors) {
      payload = {
        ...payload,
        ...{ query_sectors_ids: [...currentFilters.sectors, ...(currentFilters.subSectors || [])].join(',') },
      };
    }

    // Location types filter
    if (applyFilters && currentFilters?.locationTypes && this.isJamTab(tabId)) {
      payload = {
        ...payload,
        ...{ location_types: currentFilters.locationTypes.join(',') },
      };
    }

    // Process tab data
    if (this.isJamTab(tabId)) {
      payload = {
        ...payload,
        ...{ jam_type: (currentTab.id == 'jam' ? 'all' : currentTab.id) },
      };

      results = await EntityManager.listJams(payload, true);
    }
    else if (this.isProfileTab(tabId)) {
      payload = {
        ...payload,
        ...{ profile_type: (currentTab.id == 'jammer' ? 'all' : currentTab.id) },
      };

      results = await EntityManager.listProfiles(payload, true);
    }
    else if (this.isProjectTab(tabId)) {
      results = await EntityManager.listProjects(payload, true);
    }

    if (results?.data?.length > 0) {
      let tabResults: any = { ...searchState.tabResults };
     
      tabResults[tabId] = {
        total: results?.total,
        currentPage: currentPage,
        listData: [],
      };

      Store.dispatch(setTabResults(tabResults));
    }

    return results?.data || [];
  }

  shouldReload(prevState: any, currentState: any) {
    return prevState !== currentState
      && prevState?.currentTab !== currentState.currentTab
    //&& (prevState?.searchValue !== currentState.searchValue || prevState?.searchFilters !== currentState.searchFilters);
  }

  canLoadMore(event: any) {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 0;

    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  }

  isJamTab(tabId: string) {
    return this.getSearchTab(tabId)?.entityType == 'jam';
  }

  isProfileTab(tabId: string) {
    return this.getSearchTab(tabId)?.entityType == 'profile';
  }

  isProjectTab(tabId: string) {
    return this.getSearchTab(tabId)?.entityType == 'project';
  }

  getFiltersConfig() {
    let appState: any = Store.getState().app;

    return {
      countries: appState.countriesData.map((o: any) => { return { id: o.code, name: o.name } }),
      sectors: appState.sectorsData,
      subSectors: ([...appState.sectorsData].map((sector: any) => sector.sub_sectors)).flat(),
      locationTypes: EntityManager.getLocationTypes(),
    };
  }

  getSearchTab(tabId: string) {
    return this.getSearchTabs().find((o: any) => o.id == tabId);
  }

  getSearchTabs() {
    return [
      {
        id: 'jam',
        label: i18n.t('JAMs!'),
        entityType: 'jam',
        numColumns: 2,
        default: true,
      },
      {
        id: 'looking',
        label: i18n.t('Looking'),
        entityType: 'jam',
        numColumns: 2,
      },
      {
        id: 'call',
        label: i18n.t('Calls'),
        entityType: 'jam',
        numColumns: 2,
      },
      {
        id: 'event',
        label: i18n.t('Events'),
        entityType: 'jam',
        numColumns: 2,
      },
      {
        id: 'jammer',
        label: i18n.t('JAMMERS'),
        entityType: 'profile',
        numColumns: 1,
      },
      {
        id: 'personal',
        label: i18n.t('Artists'),
        entityType: 'profile',
        numColumns: 1,
      },
      {
        id: 'organization',
        label: i18n.t('Organizations'),
        entityType: 'profile',
        numColumns: 1,
      },
      {
        id: 'venue',
        label: i18n.t('Venues'),
        entityType: 'profile',
        numColumns: 2,
      },
      {
        id: 'project',
        label: i18n.t('Projects'),
        entityType: 'project',
        numColumns: 2,
      },
    ];
  }
};

export default (new SearchManager());