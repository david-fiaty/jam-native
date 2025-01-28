import { setSearchValue, setDefaultResult, setCurrentResult } from "@/redux/slices/SearchSlice";
import EntityManager from "./EntityManager";
import Store from '@/redux/Store';

class SearchManager {
  async getSearchResult(searchValue?: string) {
    let searchState = Store.getState().search;
    let currentResult: any = JSON.parse(searchState.current);

    if (!searchValue?.length) {
      return await this.getDefaultResult();
    } 
    else if (searchValue == searchState.value) {
      return currentResult;
    }

    return await this.loadData(searchValue);
  }

  async getDefaultResult() {
    return await this.loadData();
  }

  async loadData(searchValue?: string) {
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

  setSearchValue (value: any) {
    Store.dispatch(setSearchValue(value));
  }

  setSearchResult (response: any) {
    Store.dispatch(setCurrentResult(JSON.stringify(response)));
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