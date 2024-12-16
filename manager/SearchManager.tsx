import EntityManager from "./EntityManager";

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