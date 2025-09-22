import { setCurrentResults, setDefaultResults, setSearchValue } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';
import i18n from "@/translation/i18n";

class SearchManager {
  async loadResults(searchValue?: any, searchFilters?: any) {
    let searchState: any = Store.getState().search;
    let searchResults: any = {};

    if (!searchValue?.length) {
      Store.dispatch(setSearchValue(''));
      let defaultResults: any = JSON.parse(searchState.defaultResults);

      if (Object.keys(defaultResults).length > 0) {
        searchResults = this.applyFilters(defaultResults, searchFilters);
        searchResults = JSON.stringify(searchResults);
        Store.dispatch(setCurrentResults(searchResults));
      }
      else {
        searchResults = await this.sendRequest() || {};
        searchResults = JSON.stringify(searchResults);
        Store.dispatch(setCurrentResults(searchResults));
        Store.dispatch(setDefaultResults(searchResults));
      }
    }
    else {
      Store.dispatch(setSearchValue(searchValue));
      searchResults = await this.sendRequest(searchValue) || {};
      searchResults = this.applyFilters(searchResults, searchFilters);
      searchResults = JSON.stringify(searchResults);
      Store.dispatch(setCurrentResults(searchResults));
    }
  }

  async loadMoreResults(key: string, page: number, currentTab?: any, pageSize?: any) {
    let searchState: any = Store.getState().search;
    let searchValue: any = searchState.searchValue;
    let currentFilters: any = searchState.searchFilters;
    let moreResults: any = [];

    let payload: any = {
      page: page,
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

    if (key == 'jam') {
      moreResults = await EntityManager.listJams(payload);
    }
    else if (key == 'profile') {
      moreResults = await EntityManager.listProfiles(payload);
    }
    else if (key == 'project') {
      moreResults = await EntityManager.listProjects(payload);
    }

    moreResults = this.applyFilters({ [key]: moreResults }, currentFilters)[key]; 

    if (moreResults && currentTab) {
      moreResults = this.getTabResults(key, currentTab, { [key]: moreResults });
    }

    return moreResults || [];
  }

  getTabResults(key: string, currentTab: string, currentResults: any) {
    let tab: string = currentTab;
    let data: any = { ...currentResults };

    if (key == 'jam' && tab && tab != 'jam') {
      data[key] = data[key].filter((o: any) => o.type == tab);
    }
    else if (key == 'profile' && tab && tab != 'jammer') {
      data[key] = data[key].filter((o: any) => o.profile_type == tab);
    }

    return data[key];
  }

  async sendRequest(searchValue?: string) {
    let payload: any = {};

    if (searchValue?.length) {
      payload = {
        ...payload,
        ...{
          query_text: searchValue,
          query_title: searchValue,
        },
      };
    }

    const [jam, profile, project] = await Promise.all([
      EntityManager.listJams(payload),
      EntityManager.listProfiles(payload),
      EntityManager.listProjects(payload),
    ]);

    return {
      jam: jam || [],
      profile: profile || [],
      project: project || [],
    };
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

  isJamTab(key: string) {
    return ['jam', 'looking', 'call', 'event'].includes(key);
  }

  isProfileTab(key: string) {
    return ['jammer', 'venue', 'organization', 'personal'].includes(key);
  }

  isProjectTab(key: string) {
    return ['project'].includes(key);
  }

  getSearchTabs() {
    return [
      {
        id: 'jam',
        label: i18n.t('Jams'),
        numColumns: 2,
        default: true,
      },
      {
        id: 'looking',
        label: i18n.t('Lookings'),
        numColumns: 2,
      },
      {
        id: 'call',
        label: i18n.t('Calls'),
        numColumns: 2,
      },
      {
        id: 'event',
        label: i18n.t('Events'),
        numColumns: 2,
      },
      {
        id: 'jammer',
        label: i18n.t('Jammers'),
        numColumns: 1,
      },
      {
        id: 'personal',
        label: i18n.t('Artists'),
        numColumns: 1,
      },
      {
        id: 'organization',
        label: i18n.t('Organization'),
        numColumns: 1,
      },
      {
        id: 'venue',
        label: i18n.t('Venues'),
        numColumns: 2,
      },
      {
        id: 'project',
        label: i18n.t('Projects'),
        numColumns: 2,
      },
    ];
  }
};

export default (new SearchManager());