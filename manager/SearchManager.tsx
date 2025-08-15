import { setCurrentResults, setDefaultResults, setSearchValue } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

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

  async sendRequest(searchValue?: string) {
    let payload: any = {};

    if (searchValue?.length) {
      payload = { query_text: searchValue};
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
    if (searchFilters) {



      //b.every(val => a.includes(val));
      searchResults.jam = searchResults.jam.filter((o: any) => o.id == 18);
      console.log('search filters', searchFilters)
      //console.log('search results', searchResults)
    }

    return searchResults;
  }
};

export default (new SearchManager());