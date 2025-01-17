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

    Store.dispatch(setSearchResult(JSON.stringify(response)));

    return response;
  }

  /*
  getSearchResultsIds = async () => {
    let jamResultsIds: any = [];
    let searchValue: string = searchState.value || '';

    if (searchValue.length > 0) {
      let searchResults: any = await SearchManager.loadData(searchValue); 
      jamResultsIds = (searchResults?.jam || []).map((o: any) => o.id);
    }

    return jamResultsIds;
  };
  */


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

  isExpanded() {
    return Store.getState().search.expanded === true;
  }
};

export default (new SearchManager());