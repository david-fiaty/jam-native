import { setCurrentResults, setDefaultResults, setSearchValue } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  async loadResults(searchValue?: any, filters?: string) {
    let searchState: any = Store.getState().search;

    if (!searchValue?.length) {
      Store.dispatch(setSearchValue(''));
      let defaultResults: any = JSON.parse(searchState.defaultResults);

      if (Object.keys(defaultResults).length > 0) {
        Store.dispatch(setCurrentResults(searchState.defaultResults));
      }
      else {
        let results: any = JSON.stringify(await this.sendRequest() || {});
        Store.dispatch(setCurrentResults(results));
        Store.dispatch(setDefaultResults(results));
      }
    }
    else {
      Store.dispatch(setSearchValue(searchValue));
      let results: any = JSON.stringify(await this.sendRequest(searchValue) || {});
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
};

export default (new SearchManager());