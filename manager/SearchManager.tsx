import EntityManager from "./EntityManager";
import Store from '@/redux/Store';
import i18n from "@/translation/i18n";

class SearchManager {
  async getListData(currentPage: number, pageSize: number) {
    const [jam, profile, project] = await Promise.all([
      this.loadResults('jam', currentPage, pageSize),
      this.loadResults('profile', currentPage, pageSize),
      this.loadResults('project', currentPage, pageSize),
    ]);

    return {
      jam: jam,
      jammer: profile,
      project: project,
      looking: jam.filter((o: any) => o.type == 'looking'),
      call: jam.filter((o: any) => o.type == 'call'),
      event: jam.filter((o: any) => o.type == 'event'),
      personal: profile.filter((o: any) => o.profile_type == 'personal'),
      organization: profile.filter((o: any) => o.profile_type == 'organization'),
      venue: profile.filter((o: any) => o.profile_type == 'venue'),
    };
  }

  async loadResults(tabId: string, currentPage: number, pageSize?: any) {
    let searchState: any = Store.getState().search;
    let searchValue: any = searchState.searchValue;
    let currentFilters: any = searchState.searchFilters;
    let moreResults: any = [];
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
      payload = {
        ...payload,
        ...{ jam_type: currentTab.type },
      };

      moreResults = await EntityManager.listJams(payload);
    }
    else if (this.isProfileTab(tabId)) {
      payload = {
        ...payload,
        ...{ profile_type: currentTab.type },
      };

      moreResults = await EntityManager.listProfiles(payload);
    }
    else if (this.isProjectTab(tabId)) {
      moreResults = await EntityManager.listProjects(payload);
    }

    moreResults = this.applyFilters({ [currentTab.type]: moreResults }, currentFilters)[currentTab.type];

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
        type: 'jam',
        label: i18n.t('Jams'),
        numColumns: 2,
        default: true,
      },
      {
        id: 'looking',
        type: 'jam',
        label: i18n.t('Lookings'),
        numColumns: 2,
      },
      {
        id: 'call',
        type: 'jam',
        label: i18n.t('Calls'),
        numColumns: 2,
      },
      {
        id: 'event',
        type: 'jam',
        label: i18n.t('Events'),
        numColumns: 2,
      },
      {
        id: 'jammer',
        type: 'profile',
        label: i18n.t('Jammers'),
        numColumns: 1,
      },
      {
        id: 'personal',
        type: 'profile',
        label: i18n.t('Artists'),
        numColumns: 1,
      },
      {
        id: 'organization',
        type: 'profile',
        label: i18n.t('Organization'),
        numColumns: 1,
      },
      {
        id: 'venue',
        type: 'profile',
        label: i18n.t('Venues'),
        numColumns: 2,
      },
      {
        id: 'project',
        type: 'project',
        label: i18n.t('Projects'),
        numColumns: 2,
      },
    ];
  }
};

export default (new SearchManager());