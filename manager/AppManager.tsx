import Store from "@/redux/Store";

class AppManager {
  push(sectionId: string, router: any, params?: any) {
    router.push({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }

  replace(sectionId: string, router: any, params?: any) {
    router.replace({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }

  back(router: any) {
    router.back();
  }
}

export default (new AppManager());