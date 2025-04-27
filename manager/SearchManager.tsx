import { setSearchValue, setDefaultIndex, setResultIndex } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  async getSearchResults(idArray: any [] = []) {
    let searchState: any = Store.getState().search;
    let itemsIds = [];

    if (idArray?.length > 0) itemsIds = idArray
    else if (searchState.resultIndex.length > 0) itemsIds = searchState.resultIndex
    else itemsIds = searchState.defaultIndex;
        
    return await EntityManager.getJams({ items_ids: itemsIds});
  }

  async loadSearchResults(searchValue?: string, filter?: string) {
    let searchState: any = Store.getState().search;
    let results: any[] = [];

    if (searchValue?.length) {
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

  async clearSearch() {
    Store.dispatch(setSearchValue(''));
    Store.dispatch(setResultIndex([]));
    await this.loadSearchResults(); 
  }

  async getDefaultResults() {
    let results = await EntityManager.listJams();
    Store.dispatch(setDefaultIndex(results.map((o: any) => o.id)));

    return results;
  }
};

export default (new SearchManager());