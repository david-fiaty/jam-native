import { setSearchValue, setDefaultIndex, setResultIndex } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  async loadResults(searchValue?: string, filter?: string) {
    let searchState: any = Store.getState().search;
    let results: any = [];

    if (searchValue?.length) {
      results = await this.sendListRequest(searchValue);
      Store.dispatch(setSearchValue(searchValue));
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

  buildIndex (results: any) {
    let index: any = {};

    for (const [key, data] of Object.entries(results)) {
      index[key] = (data || []).map((o: any) => o.id);
    }
    
    return index;
  }

  async getResults() {
    let searchState: any = Store.getState().search;
    let itemsIds = [];

    if (searchState.resultIndex.length > 0) itemsIds = searchState.resultIndex
    else itemsIds = searchState.defaultIndex;
        
    return await this.sendItemRequest(itemsIds);
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
      EntityManager.getJams({ items_ids: itemsIds.jam }), 
      EntityManager.getProfiles({ items_ids: itemsIds.profile }),
      EntityManager.getProjects({ items_ids: itemsIds.project }),
    ]);

    return {
      jam: jam || [],
      profile: profile || [],
      project: project || [],
    };
  }
};

export default (new SearchManager());