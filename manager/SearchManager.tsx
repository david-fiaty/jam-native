import { setCurrentResults, setDefaultResults, setSearchValue } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  async loadResults(searchValue?: any, filters?: any) {
    let searchState: any = Store.getState().search;
    let results: any = {};

    if (!searchValue?.length) {
      Store.dispatch(setSearchValue(''));
      let defaultResults: any = JSON.parse(searchState.defaultResults);

      if (Object.keys(defaultResults).length > 0) {
        results = this.applyFilters(defaultResults, filters);
        results = JSON.stringify(results);
        Store.dispatch(setCurrentResults(results));
      }
      else {
        results = await this.sendRequest() || {};
        results = JSON.stringify(results);
        Store.dispatch(setCurrentResults(results));
        Store.dispatch(setDefaultResults(results));
      }
    }
    else {
      Store.dispatch(setSearchValue(searchValue));
      results = await this.sendRequest(searchValue) || {};
      results = JSON.stringify(results);
      Store.dispatch(setCurrentResults(results));
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

  applyFilters(searchResults: any, filters: any) {

    return searchResults;
  }
};

export default (new SearchManager());