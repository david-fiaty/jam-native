import { setSearchResult } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  async getDefaultData() {
    return await this.loadData();
  }

  getSearchResult(key?: any, searchValue?: string) {
    let searchState = Store.getState().search;
    let searchResult: any = searchState.result?.length > 0 ? searchState.result : this.loadData(searchValue);
    let data: any = JSON.parse(searchResult);

    if (key && key?.length > 0 && Object.keys(data).length > 0) {
      return data[key];
    }
    else if (!Object.keys(data).length) {
      return this.getDefaultData();
    }

    return data;
  }

  // Todo - Why searchValue not used, since passed as argument from onSubmitEditing in SearchField component
  async loadData(searchValue?: any) {
    const [jams, profiles, projects] = await this.sendRequest();
    
    return this.buildResponse({
      jams: jams, 
      profiles: profiles, 
      projects: projects
    });
  }

  setSearchResult (response: any) {
    let results: any = {};
    for (const [key, data] of Object.entries(response)) {
      results[key] = (data || []).map((o: any) => o.id);
    }

    Store.dispatch(setSearchResult(JSON.stringify(results)));
  }

  isExpanded() {
    return Store.getState().search.expanded === true;
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