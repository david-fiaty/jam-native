import { setSearchResult } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  data?: any;
  result?: any;

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

  setSearchResult (response: any) {
    let results: any = {};
    for (const [key, data] of Object.entries(response)) {
      results[key] = (data || []).map((o: any) => o.id);
    }

    Store.dispatch(setSearchResult(JSON.stringify(results)));
  }

  getSearchResult(key?: string) {
    let searchState = Store.getState().search;
    let searchResult: any = searchState.result || '{}';
    let data: any = JSON.parse(searchResult);

    return key ? data[key] : data;
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