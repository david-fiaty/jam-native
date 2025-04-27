import { setSearchValue, setDefaultIndex, setResultIndex } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  async loadResults(searchValue?: string, filter?: string) {
    let searchState: any = Store.getState().search;
    let results: any[] = [];

    if (searchValue?.length) {
      //results = await this.sendRequest({ query_text: searchValue });

      //console.log('multirequest ->>>>>', await this.sendRequest({ query_text: searchValue }));

      let x = await this.sendRequest({ query_text: searchValue });
      console.log('multirequest index ->>>>>', this.buildIndex(x));

      results = await EntityManager.listJams({ query_text: searchValue });
      Store.dispatch(setSearchValue(searchValue));
      Store.dispatch(setResultIndex(results.map((o: any) => o.id)));
    }
    else if (searchState.defaultIndex.length) {
      results = await EntityManager.getJams({ items_ids: searchState.defaultIndex });
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

  async getResults(idArray?: any) {
    let searchState: any = Store.getState().search;
    let itemsIds = [];

    if (idArray && idArray?.length > 0) itemsIds = idArray
    else if (searchState.resultIndex.length > 0) itemsIds = searchState.resultIndex
    else itemsIds = searchState.defaultIndex;
        
    return await EntityManager.getJams({ items_ids: itemsIds});
  }

  async resetSearch() {
    Store.dispatch(setSearchValue(''));
    Store.dispatch(setResultIndex([]));
    await this.loadResults(); 
  }

  async getDefaultResults() {
    let results = await EntityManager.listJams();
    Store.dispatch(setDefaultIndex(results.map((o: any) => o.id)));

    return results;
  }

  async sendRequest(options?: any) {
    const [jam, profile, project] =  await Promise.all([
      EntityManager.listJams(options), 
      EntityManager.listProfiles(options),
      EntityManager.listProjects(options),
    ]);

    return {
      jam: jam,
      profile: profile,
      project: project,
    };
  }
};

export default (new SearchManager());