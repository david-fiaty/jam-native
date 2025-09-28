import { setTabResults } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';
import i18n from "@/translation/i18n";

class SearchManager {
  async loadResults(tabId: string, currentPage: number, pageSize?: any) {
    let searchState: any = Store.getState().search;
    let searchValue: any = searchState.searchValue;
    let currentFilters: any = searchState.searchFilters;
    let results: any = {};
    let currentTab: any = this.getSearchTab(tabId);

    let payload: any = {
      page: currentPage,
    };

    if (pageSize) {
      payload = {
        ...payload,
        ...{ page_size: pageSize },
      };
    }

    if (searchValue?.length) {
      payload = {
        ...payload,
        ...{
          query_text: searchValue,
          query_title: searchValue,
        },
      };
    }

    if (this.isJamTab(tabId)) {
      let jamType: string = currentTab.id == 'jam' ? 'all' : currentTab.id;  
      payload = {
        ...payload,
        ...{ jam_type: jamType },
      };

      results = await EntityManager.listJams(payload, true);
    }
    else if (this.isProfileTab(tabId)) {
      let profileType: string = currentTab.id == 'jammer' ? 'all' : currentTab.id;  
      payload = {
        ...payload,
        ...{ profile_type: profileType },
      };

      results = await EntityManager.listProfiles(payload, true);
    }
    else if (this.isProjectTab(tabId)) {
      results = await EntityManager.listProjects(payload, true);
    }
    
    if (results?.data?.length > 0) {
      // Todo - Apply filters
      //results.data = this.applyFilters(tabId, results.data, currentFilters);
      //results.total = results.data.length;

      if (results?.total && searchState.tabResults?.[tabId] !== results?.total ) {
        let tabResults = {...searchState.tabResults};
        tabResults[tabId] = results?.total;
        Store.dispatch(setTabResults(tabResults));
      }
    }

    return results?.data || [];
  }

  shouldRefreshResults () {
    return false;
  }

  applyFilters(tabId: string, searchResults: any, searchFilters: any) {
    if (!Object.keys(searchFilters)?.length) return searchResults;

    if (this.isJamTab(tabId)) {
      if (searchFilters?.countries) {
        searchResults = searchResults.filter((o: any) => {
          return searchFilters.countries.some((id: any) => o?.countries?.includes(id));
        });
      }

      if (searchFilters?.sectors) {
        searchResults = searchResults.filter((o: any) => {
          return [...searchFilters.sectors, ...(searchFilters.subSectors || [])].some((id: number) => o?.sectors?.includes(id));
        });
      }

      if (searchFilters?.locationTypes) {
        searchResults = searchResults.filter((o: any) => {
          return searchFilters.locationTypes.some((id: any) => o?.location_type?.includes(id));
        });
      }

      if (searchFilters?.jamTypes) {
        searchResults = searchResults.filter((o: any) => {
          return searchFilters.jamTypes.some((id: any) => o?.type?.includes(id));
        });
      }
    }
    else if (this.isProfileTab(tabId)) {
      if (searchFilters?.countries) {
        searchResults = searchResults.filter((o: any) => {
          return searchFilters.countries.some((id: any) => o?.country?.includes(id));
        });
      }

      if (searchFilters?.sectors) {
        searchResults = searchResults.filter((o: any) => {
          return [...searchFilters.sectors, ...(searchFilters.subSectors || [])].some((id: number) => o?.sectors?.includes(id));
        });
      }
    }
    else if (this.isProjectTab(tabId)) {
      if (searchFilters?.countries) {
        searchResults = searchResults.filter((o: any) => {
          return searchFilters.countries.some((id: any) => o?.countries?.includes(id));
        });
      }

      if (searchFilters?.sectors) {
        searchResults = searchResults.filter((o: any) => {
          return [...searchFilters.sectors, ...(searchFilters.subSectors || [])].some((id: number) => o?.sectors?.includes(id));
        });
      }
    }

    return searchResults;
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
      jamTypes: EntityManager.getJamTypes(),
    };
  }

  getSearchTab(tabId: string) {
    return this.getSearchTabs().find((o: any) => o.id == tabId);
  }

  getSearchTabs() {
    return [
      {
        id: 'jam',
        label: i18n.t('Jams'),
        entityType: 'jam',
        numColumns: 2,
        default: true,
      },
      {
        id: 'looking',
        label: i18n.t('Lookings'),
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
        label: i18n.t('Jammers'),
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