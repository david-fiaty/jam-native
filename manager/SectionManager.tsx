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
    let sectionConfig: any[] = Store.getState().section.config;
    let activeSections: any[] = [...Store.getState().section.active];
  
    activeSections.pop();
    Store.dispatch(setActiveSections(activeSections));

    if (activeSections.length > 0) { 
      let targetSection: any = sectionConfig.find((o: any) => o.id === activeSections[activeSections.length - 1].id);

      if (targetSection.backButtonRoute !== null) {
        router.dismissTo({
          pathname: targetSection.backButtonRoute,
          params: targetSection?.params || {},
        });
      } 
      else {
        router.dismissTo({
          pathname: `/${targetSection.id}`,
          params: targetSection?.params || {},
        });
      }
    }
    else {
      router.dismissTo({
        pathname: `/`,
        params: {},
      });
    }
  }
}

export default (new SectionManager());