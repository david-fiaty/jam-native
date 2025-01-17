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

    return this.buildResponse({
      jams: jams, 
      profiles: profiles, 
      projects: projects
    });
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

  isExpanded() {
    return Store.getState().search.expanded === true;
  }
};

export default (new SearchManager());