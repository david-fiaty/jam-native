import { setActiveSections } from "@/redux/slices/SectionSlice";
import Store from "@/redux/Store";
import i18n from "@/translation/i18n";

class SectionManager {
  push(router: any, sectionId: string, params?: any, title?: any) {
    let sectionState: any = Store.getState().section;
    let activeSections: any[] = [...sectionState.active];
    let sectionConfig: any[] = [...sectionState.config];
    let targetSection: any = sectionConfig.find((o: any) => o.id === sectionId);

    activeSections.push({
      ...targetSection,
      ...{ params: (Object.keys(params || {}).length > 0 ? params : {}) },
      ...{ title: (params?.title?.length > 0 ? i18n.t(params.title) : i18n.t(targetSection.title))},
    });

    Store.dispatch(setActiveSections(activeSections));

    router.push({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }

  replace(router: any, sectionId: string, params?: any) {
    let sectionState: any = Store.getState().section;
    let activeSections: any[] = [...sectionState.active];
    let sectionConfig: any[] = [...sectionState.config];
    let targetSection: any = sectionConfig.find((o: any) => o.id === sectionId);

    if (activeSections?.length > 0 && activeSections.at(-1)?.id == sectionId) {
      activeSections = activeSections.filter((o: any) => o.id != sectionId);
    }

    activeSections.push({
      ...targetSection,
      ...{ params: (Object.keys(params || {}).length > 0 ? params : {}) },
      ...{ title: (params?.title?.length > 0 ? i18n.t(params.title) : i18n.t(targetSection.title))},
    });

    Store.dispatch(setActiveSections(activeSections));

    router.replace({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }

  back(router: any) {
    let sectionState: any = Store.getState().section;
    let sectionConfig: any[] = sectionState.config;
    let activeSections: any[] = [...sectionState.active];
  
    activeSections.pop();
    Store.dispatch(setActiveSections(activeSections));

    if (activeSections.length > 0) { 
      let targetSection: any = sectionConfig.find((o: any) => o.id === activeSections[activeSections.length - 1].id);

      if (targetSection.backButtonRoute !== null) {
        Store.dispatch(setActiveSections([]));
        
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
        pathname: `/welcome`,
        params: {},
      });
    }
  }
}

export default (new SectionManager());