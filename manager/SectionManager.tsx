import { setSectionId } from "@/redux/slices/SectionSlice";
import Store from "@/redux/Store";

class SectionManager {
  setCurrentSection(sectionId: string) {
    Store.dispatch(setSectionId(sectionId));
  }
  
  getCurrentSection(sectionName: string) {
    return Store.getState().section;
  }
}

export default (new SectionManager());