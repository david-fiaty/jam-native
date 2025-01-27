import { setSearchResult } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  async getDefaultData() {
    return await this.loadData();
  }

  async getSearchResult(searchValue?: string) {
    let searchState = Store.getState().search;
    let searchResult: any = searchState.result?.length ? JSON.parse(searchState.result) : this.loadData(searchValue);

    if (Object.keys(searchResult).length > 0) {
      return searchResult;
    }
    
    return this.getDefaultData();
  }

  async loadData(searchValue?: string) {
    const options = searchValue?.length ? { query_text: searchValue } : {};
    const [jams, profiles, projects] = await this.sendRequest(options);
    const response = this.buildResponse({
      jams: jams, 
      profiles: profiles, 
      projects: projects
    });

    return this.storeSearchResult(response);
  }

  storeSearchResult (response: any) {
    Store.dispatch(setSearchResult(JSON.stringify(response)));

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