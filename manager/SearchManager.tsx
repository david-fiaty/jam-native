import { setSearchValue, setDefaultResult, setCurrentResult } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  async getSearchResult(searchValue?: string) {
    if (searchValue?.length == 0) {
      return await this.getDefaultResult();
    } 
    else if (searchValue == this.getCurrentValue()) {
      return await this.getCurrentResult();
    }
    else {
      let searchResult: any = await this.loadData(searchValue);
      this.setCurrentResult(searchResult);
      return searchResult;
    }
  }

  async getDefaultResult() {
    let defaultResult: any = (Store.getState().search.default);

    if (Object.keys(defaultResult)?.length > 0) {
      return await this.unpackResult(defaultResult);
    }
    else {
      defaultResult = await this.loadData();
      this.setDefaultResult(defaultResult);
    }

    return defaultResult;
  }

  setDefaultResult(result: any) {
    Store.dispatch(setDefaultResult(this.packResult(result)));
  }

  getCurrentValue() {
    return Store.getState().search.value;
  }

  setCurrentValue(value: any) {
    Store.dispatch(setSearchValue(value));
  }

  async getCurrentResult() {
    return await this.unpackResult(Store.getState().search.current);
  }

  setCurrentResult(result: any) {
    Store.dispatch(setCurrentResult(this.packResult(result)));
  }

  packResult(result: any) {
    let obj: any = {};
  
    for (const key in result) {
      obj[key] = result[key].map((item: any) => item.id);
    }
  
    return JSON.stringify(obj);
  }

  async unpackResult(str: any) {
    let result: any = JSON.parse(str);    
    let request: any = [];

    for (const key in result) {
      switch (key) {
        case 'jam':
          request.push(EntityManager.getJams({ items_ids: result[key] }));
          break;

        case 'profile':
          request.push(EntityManager.getProfiles({ items_ids: result[key] }));
          break;

        case 'project':
          request.push(EntityManager.getProjects({ items_ids: result[key] }));
          break;
      }
    }

    const [jam, profile, project] = await Promise.all(request);

    return {jam, profile, project};
  }

  async loadData(searchValue?: string) {
    const options = searchValue?.length ? { query_text: searchValue } : {};
    const [jams, profiles, projects] = await this.sendSearchRequest(options);
    const response = this.buildSearchResponse({
      jams: jams, 
      profiles: profiles, 
      projects: projects
    });

    return response;
  }

  async sendSearchRequest(options?: any) {
    return await Promise.all([
      EntityManager.listJams(options), 
      EntityManager.listProfiles(options),
      EntityManager.listProjects(options),
    ]);
  }

  buildSearchResponse(data?: any) {
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