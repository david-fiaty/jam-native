import { setSearchValue, setCurrentResults, setDefaultResults } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  async loadResults(searchValue?: any, filter?: string) {
    let searchState: any = Store.getState().search;

    if (!searchValue?.length) {
      let defaultResults: any = JSON.parse(searchState.defaultResults);

      if (Object.keys(defaultResults).length > 0) {
        Store.dispatch(setCurrentResults(searchState.defaultResults));
      }
      else {
        let results: any = JSON.stringify(await this.sendListRequest() || '{}');
        Store.dispatch(setDefaultResults(results));
        Store.dispatch(setCurrentResults(results));
      }
    }
    else {
      let results: any = JSON.stringify(await this.sendListRequest(searchValue) || '{}');
      Store.dispatch(setCurrentResults(results));
    }
  }

  getResults() {
    let searchState: any = Store.getState().search;
    let results: any = JSON.parse(searchState.currentResults);

    return results;
  }

  resetResults() {
    let searchState: any = Store.getState().search;
    Store.dispatch(setSearchValue(''));
    Store.dispatch(setCurrentResults(searchState.defaultResults));
  }

  async sendListRequest(searchValue?: string) {
    let payload: any = {};

    if (searchValue?.length) payload = { query_text: searchValue };

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
};

export default (new SearchManager());