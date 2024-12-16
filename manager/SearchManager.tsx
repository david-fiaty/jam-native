import EntityManager from "./EntityManager";

class SearchManager {

  async loadData() {
    const [jams, profiles, projects] = await Promise.all([
      EntityManager.listJams(), 
      EntityManager.listProfiles(),
      EntityManager.listProjects(),
    ]);
    
    return {
      jam: jams,
      jammer: profiles,
      venue: profiles,
      project: projects,
      call: profiles.filter((o: any) => o?.type == 'call'),
      event: profiles.filter((o: any) => o?.type == 'event'),
    };
  }
};

export default (new SearchManager());