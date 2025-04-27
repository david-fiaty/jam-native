import { setSearchValue, setDefaultIndex, setResultIndex } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  async getSearchResults(searchValue?: string, filter?: string) {
    let searchState: any = Store.getState().search;
    let results: any[] = [];

    if (searchState.searchValue.length && searchState.resultIndex.length && searchState.searchValue == searchValue) {
      results = await EntityManager.getJams({ items_ids: searchState.resultIndex });
    }
    else if (searchState.searchValue.length && searchState.resultIndex.length && searchState.searchValue != searchValue) {
      results = await EntityManager.listJams({ query_text: searchValue });
      Store.dispatch(setSearchValue(searchValue));
      Store.dispatch(setResultIndex(results.map((o: any) => o.id)));
    }
    else if (searchState.defaultIndex.length) {
      results = await EntityManager.getJams({ items_ids: searchState.defaultIndex });
    }
    else if (!searchState.defaultIndex.length) {
      results = await this.getDefaultResults();
    }

    return results;
  } 

  async clearSearch() {
    Store.dispatch(setSearchValue(''));
    let results: any = await this.getDefaultResults(); 

    return results;
  }

  async getDefaultResults() {
    let results = await EntityManager.listJams();
    Store.dispatch(setDefaultIndex(results.map((o: any) => o.id)));

    return results;
  }

};

export default (new SearchManager());