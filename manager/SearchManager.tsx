import { setSearchValue, setDefaultIndex, setResultIndex } from "@/redux/slices/SearchSlice";
import { Config } from "@/constants/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    else if (!searchState.defaultIndex.length) {
      results = await EntityManager.listJams();
      Store.dispatch(setDefaultIndex(results.map((o: any) => o.id)));
    }
    else if (searchState.defaultIndex.length) {
      results = await EntityManager.getJams({ items_ids: searchState.defaultIndex });
    }

    return results;
  } 

  async clearSearch() {
    Store.dispatch(setSearchValue(''));
  }

  async loadData(searchValue?: string) {
    const options = searchValue?.length ? { query_text: searchValue } : {};
    let data: any = [];

    if (Config.dataCacheEnabled === true && searchValue?.length) {
      let cacheKey = this.getCacheKey(searchValue);
      data = await AsyncStorage.getItem(cacheKey);

      if (data === null) {
        data = await this.sendRequest(options);
        await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
      }  
      else {
        data = JSON.parse(data);
      }
    }
    else {
      data = await this.sendRequest(options);
    }

    const [jams, profiles, projects] = data;
    
    const result = this.buildResponse({
      jams: jams, 
      profiles: profiles, 
      projects: projects
    });

    this.setCurrentValue(searchValue);
    this.setDefaultResult(result);
    this.setCurrentResult(result);
    
    return result;
  }

  async sendRequest(options?: any) {
    return await Promise.all([
      EntityManager.listJams(options), 
      EntityManager.listProfiles(options),
      EntityManager.listProjects(options),
    ]);
  }

  buildResponse(data?: any) {
    return {
      jam: data.jams,
      project: data.projects,
      jammer: data.profiles,
      venue: data.profiles?.filter((o: any) => o?.profile_type == 'venue'),
      // Todo - Add categories
      //personal: data.profiles.filter((o: any) => o?.profile_type == 'personal'),
      //organization: data.profiles.filter((o: any) => o?.profile_type == 'organization'),
      call: data.jams?.filter((o: any) => o?.type == 'call'),
      event: data.jams?.filter((o: any) => o?.type == 'event'),
    };
  }

  getCacheKey(searchValue: string) {
    return searchValue.replace(/\W/g, '');
  }
};

export default (new SearchManager());