import { setSearchResult } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  data?: any;
  result?: any;

  async getData() {
    if (!this.data?.length) {
      this.data = await this.loadData();
    }

    return this.data;
  }

  async getResult(searchValue: string) {
    if (!this.result?.length) {
      this.result = await this.loadResult(searchValue);
    }

    return this.result;
  }

  async loadData() {
    const [jams, profiles, projects] = await this.sendRequest();
    
    return this.buildResponse({
      jams: jams, 
      profiles: profiles, 
      projects: projects
    });
  }

  async loadResult(searchValue: string) {
    const options = searchValue?.length ? { query_text: searchValue } : {};
    const [jams, profiles, projects] = await this.sendRequest(options);

    return this.buildResponse({
      jams: jams, 
      profiles: profiles, 
      projects: projects
    });
  }

  /*
  async loadData(searchValue?: string) {
    if (!searchValue || !searchValue?.length) {
      searchValue = Store.getState().search.value;
    }

    const options = searchValue?.length ? { query_text: searchValue } : {};
    const [jams, profiles, projects] = await this.sendRequest(options);
    const response = this.buildResponse({
      jams: jams, 
      profiles: profiles, 
      projects: projects
    });

    this.setSearchResult(response);

    return response;
  }
*/

  setSearchResult (response: any) {
    let results: any = {};
    for (const [key, data] of Object.entries(response)) {
      results[key] = (data || []).map((o: any) => o.id);
    }

    Store.dispatch(setSearchResult(JSON.stringify(results)));
  }

  getSearchResult(key?: string) {
    let searchState = Store.getState().search;
    let searchResult: any = searchState.result?.length > 0 ? searchState.result : '{}';
    let data: any = JSON.parse(searchResult);

    if (key && key?.length > 0 && Object.keys(data).length > 0) {
      return data[key];
    }

    return data;
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
      jammer: data.profiles,
      venue: data.profiles,
      project: data.projects,
      call: data.jams.filter((o: any) => o?.type == 'call'),
      event: data.jams.filter((o: any) => o?.type == 'event'),
    };
  }
};

export default (new SearchManager());