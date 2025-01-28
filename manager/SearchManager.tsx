import { setSearchValue, setDefaultResult, setCurrentResult } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  async getSearchResult(searchValue?: string) {
    if (searchValue?.length == 0) {
      return await this.getDefaultResult();
    } 
    else if (searchValue == this.getCurrentValue()) {
      return this.getCurrentResult();
    }
    else {
      let searchResult: any = await this.loadData(searchValue);
      this.setCurrentResult(searchResult);
      return searchResult;
    }
  }

  async getDefaultResult() {
    let defaultResult: any = JSON.parse(Store.getState().search.default);

    if (Object.keys(defaultResult)?.length > 0) {
      return defaultResult;
    }
    else {
      defaultResult = await this.loadData();
      this.setDefaultResult(defaultResult);
    }

    return defaultResult;
  }

  setDefaultResult(result: any) {
    Store.dispatch(setDefaultResult(JSON.stringify(result)));
  }

  getCurrentValue() {
    return Store.getState().search.value;
  }

  setCurrentValue(value: any) {
    Store.dispatch(setSearchValue(value));
  }

  getCurrentResult() {
    return JSON.parse(Store.getState().search.current);
  }

  setCurrentResult(result: any) {
    Store.dispatch(setCurrentResult(JSON.stringify(result)));
  }

  packResult(result: any) {

  }

  unpackResult(result: any) {
    
  }

  async loadData(searchValue?: string) {
    const options = searchValue?.length ? { query_text: searchValue } : {};
    const [jams, profiles, projects] = await this.sendRequest(options);
    const response = this.buildResponse({
      jams: jams, 
      profiles: profiles, 
      projects: projects
    });

    return response;
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
      venue: data.profiles.filter((o: any) => o?.profile_type == 'venue'),
      // Todo - Add categories
      //personal: data.profiles.filter((o: any) => o?.profile_type == 'personal'),
      //organization: data.profiles.filter((o: any) => o?.profile_type == 'organization'),
      call: data.jams.filter((o: any) => o?.type == 'call'),
      event: data.jams.filter((o: any) => o?.type == 'event'),
    };
  }
};

export default (new SearchManager());