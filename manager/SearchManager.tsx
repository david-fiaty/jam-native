import { setSearchValue, setDefaultIndex, setResultIndex, setCurrentResults, setDefaultResults } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  async loadResults(searchValue?: any, filter?: string) {
    let searchState: any = Store.getState().search;
    let defaultResults: any = JSON.parse(searchState.defaultResults);

    if (!searchValue?.length && Object.keys(defaultResults).length > 0) {
      Store.dispatch(setCurrentResults(searchState.defaultResults));  
    } 
    else if (!searchValue?.length && !Object.keys(defaultResults).length) {
      let results: any = JSON.stringify(await this.sendListRequest() || '{}');
      Store.dispatch(setDefaultResults(results));
      Store.dispatch(setCurrentResults(results));  
    }
    else if (searchValue?.length > 0) {
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

  /*
  async loadResults(searchValue?: string, filter?: string) {
    let searchState: any = Store.getState().search;
    let results: any = [];

    if (searchValue?.length) {
      results = await this.sendListRequest(searchValue);
      Store.dispatch(setResultIndex(this.buildIndex(results)));
    }
    else if (searchState.defaultIndex.length) {
      results = await this.sendItemRequest(searchState.defaultIndex);
    }
    else {
      results = await this.getDefaultResults();
    }
    
    return results;
  } 
    */

  buildIndex(results: any) {
    let index: any = {};

    for (const [key, data] of Object.entries(results)) {
      index[key] = (data || []).map((o: any) => o.id);
    }

    return index;
  }

  async resetSearch() {
    Store.dispatch(setSearchValue(''));
    Store.dispatch(setResultIndex([]));
    await this.loadResults();
  }

  async getDefaultResults() {
    let results = await this.sendListRequest();
    Store.dispatch(setDefaultIndex(this.buildIndex(results)));

    return results;
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

  async sendItemRequest(itemsIds: any) {
    const [jam, profile, project] = await Promise.all([
      EntityManager.getJams(itemsIds.jam),
      EntityManager.getProfiles(itemsIds.profile),
      EntityManager.getProjects(itemsIds.project),
    ]);

    return {
      jam: jam || [],
      profile: profile || [],
      project: project || [],
    };
  }
};

export default (new SearchManager());