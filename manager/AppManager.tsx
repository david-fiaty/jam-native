
class AppManager {
  pushSection(sectionId: string, router: any, params?: any) {
    router.push({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }

  replaceSection(sectionId: string, router: any, params?: any) {
    router.replace({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }
}

export default (new AppManager());