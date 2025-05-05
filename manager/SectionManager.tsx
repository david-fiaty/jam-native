import { setActiveSections } from "@/redux/slices/SectionSlice";
import { setActiveModals } from "@/redux/slices/ModalSlice";
import Store from "@/redux/Store";

class SectionManager {
  push(router: any, sectionId: string, params?: any) {
    router.push({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }

  replace(router: any, sectionId: string, params?: any) {
    router.replace({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }

  back(router: any) {
    let activeSections: any = [...Store.getState().section.active];
  
    activeSections.pop();
    Store.dispatch(setActiveSections(activeSections));

    if (activeSections.length > 0) {
      let previousSection: any = activeSections[activeSections.length - 1];
      let sectionParams: any = previousSection?.params || {};

      if (previousSection.backButtonRoute !== null) {
        router.dismissTo(this.getPreviousRoute(previousSection), sectionParams);
      }
      else if (previousSection?.id) {
        router.dismissTo(`/${previousSection.id}`);
      }
      else {
        Store.dispatch(setActiveModals([]));
        Store.dispatch(setActiveSections([]));
        router.dismissTo('/');
      } 
    }
    else {
      Store.dispatch(setActiveModals([]));
      Store.dispatch(setActiveSections([]));
      router.dismissTo('/');
    }
  }

  getPreviousRoute(section: any) {
    return section.backButtonRoute === '/' ? '/' : `/${section.backButtonRoute}`;
  }
}

export default (new SectionManager());