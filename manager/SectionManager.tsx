import { setActiveSections } from "@/redux/slices/SectionSlice";
import { setActiveModals } from "@/redux/slices/ModalSlice";
import Store from "@/redux/Store";

class SectionManager {
  push(router: any, sectionId: string, params?: any) {
    let activeSections: any[] = [...Store.getState().section.active];
    
    activeSections.push({
      id: sectionId,
      params: params || {},
    })

    Store.dispatch(setActiveSections(activeSections));

    router.push({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }

  replace(router: any, sectionId: string, params?: any) {
    let activeSections: any[] = [...Store.getState().section.active];

    activeSections.pop();

    Store.dispatch(setActiveSections(activeSections));

    router.replace({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }

  back(router: any) {
    let activeSections: any = [...Store.getState().section.active];
    let currentSection: any = null;
  
    activeSections.pop();
    Store.dispatch(setActiveSections(activeSections));

    if (activeSections.length > 0) {
      currentSection = activeSections[activeSections.length -1];
      router.dismissTo({
        pathname: `/${currentSection.id}`,
        params: currentSection?.params || {},
      });
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