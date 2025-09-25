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

    if (currentTab.entityType == 'jam') {
      let jamType: string = currentTab.id == 'jam' ? 'all' : currentTab.id;  
      payload = {
        ...payload,
        ...{ jam_type: jamType },
      };

      results = await EntityManager.listJams(payload, true);
    }
    else if (currentTab.entityType == 'profile') {
      let profileType: string = currentTab.id == 'jammer' ? 'all' : currentTab.id;  
      payload = {
        ...payload,
        ...{ profile_type: profileType },
      };

      results = await EntityManager.listProfiles(payload, true);
    }
    else if (currentTab.entityType == 'project') {
      results = await EntityManager.listProjects(payload, true);
    }

    if (results?.data?.length > 0) {
      // Todo - Double check filtering
      //results.data = this.applyFilters({ [currentTab.entityType]: results.data }, currentFilters)[currentTab.entityType];
      //results.total = results.data.length;
      //let test = this.applyFilters({ [currentTab.entityType]: results.data }, currentFilters)[currentTab.entityType];
      //console.log(test.length)
    }

    if (searchState.tabResults?.[tabId] !== results?.total ) {
      let tabResults = {...searchState.tabResults};
      tabResults[tabId] = results?.total;
      Store.dispatch(setTabResults(tabResults));
    }

    return results?.data || [];
  }

  applyFilters(searchResults: any, searchFilters: any) {
    if (!searchFilters || !Object.keys(searchFilters)?.length) return searchResults;

    if (searchFilters?.countries?.length) {
      if (searchResults?.jam) {
        searchResults.jam = searchResults.jam.filter((o: any) => {
          return searchFilters.countries.some((id: any) => o?.countries?.includes(id));
        });
      }

      if (searchResults?.project) {
        searchResults.project = searchResults.project.filter((o: any) => {
          return searchFilters.countries.some((id: any) => o?.countries?.includes(id));
        });
      }

      if (searchResults?.profile) {
        searchResults.profile = searchResults.profile.filter((o: any) => {
          return searchFilters.countries.some((id: any) => o?.country?.includes(id));
        });
      }
    }

    if (searchFilters?.sectors?.length) {
      if (searchResults?.jam) {
        searchResults.jam = searchResults.jam.filter((o: any) => {
          return [...searchFilters.sectors, ...(searchFilters.subSectors || [])].some((id: number) => o?.sectors?.includes(id));
        });
      }

      if (searchResults?.project) {
        searchResults.project = searchResults.project.filter((o: any) => {
          return [...searchFilters.sectors, ...(searchFilters.subSectors || [])].some((id: number) => o?.sectors?.includes(id));
        });
      }

      if (searchResults?.profile) {
        searchResults.profile = searchResults.profile.filter((o: any) => {
          return [...searchFilters.sectors, ...(searchFilters.subSectors || [])].some((id: number) => o?.sectors?.includes(id));
        });
      }
    }

    if (searchFilters?.locationTypes?.length) {
      if (searchResults?.jam) {
        searchResults.jam = searchResults.jam.filter((o: any) => {
          return searchFilters.locationTypes.some((id: any) => o?.location_type?.includes(id));
        });
      }
    }

    if (searchFilters?.jamTypes?.length) {
      if (searchResults?.jam) {
        searchResults.jam = searchResults.jam.filter((o: any) => {
          return searchFilters.jamTypes.some((id: any) => o?.type?.includes(id));
        });
      }
    }

    return searchResults;
  }

  handleScrollEvent(event: any, callback: any) {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 0;

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      callback();
    }
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
        label: i18n.t('Organization'),
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