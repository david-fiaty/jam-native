import { setSectionId } from "@/redux/slices/SectionSlice";
import Store from "@/redux/Store";
import AboutSection from "@/components/section/AboutSection";
import JamsSection from "@/components/section/JamsSection";
import LegalSection from "@/components/section/LegalSection";
import LoginSection from "@/components/section/LoginSection";
import WelcomeSection from "@/components/section/WelcomeSection";

class SectionManager {
  setActiveSectionId(sectionId: any) {
    Store.dispatch(setSectionId(sectionId));
  }

  getActiveSection() {
    let sectionId: any = this.getActiveSectionId();
    let section: any = this.getSection(sectionId);

    return section;
  }

  getActiveSectionId() {
    return Store.getState().section.sectionId;
  }

  getSection(sectionId: any) {
    return this.getSections().find((o: any) => o.id === sectionId);
  }

  getSections() {
    return [
      {
        id: 'welcome',
        showHeader: true,
        showFooter: true,
        render: () => <WelcomeSection />,
      },
      {
        id: 'login',
        showHeader: false,
        showFooter: false,
        render: () => <LoginSection />,
      },
      {
        id: 'about',
        showHeader: true,
        showFooter: false,
        render: () => <AboutSection />,
      },
      {
        id: 'legal',
        showHeader: true,
        showFooter: false,
        render: () => <LegalSection />,
      },
      {
        id: 'jams',
        showHeader: true,
        showFooter: true,
        render: () => <JamsSection />,
      },
    ];
  }
}

export default (new SectionManager());