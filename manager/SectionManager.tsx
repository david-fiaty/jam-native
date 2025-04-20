import { setSectionId } from "@/redux/slices/SectionSlice";
import Store from "@/redux/Store";
import AboutSection from "@/components/section/AboutSection";
import JamsSection from "@/components/section/JamsSection";
import LegalSection from "@/components/section/LegalSection";
import LoginSection from "@/components/section/LoginSection";
import WelcomeSection from "@/components/section/WelcomeSection";

class SectionManager {
  setActiveSectionId(sectionId: string) {
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

  getSection(sectionId: string) {
    return this.getSections().find((o: any) => o.id === sectionId);
  }

  getSections() {
    return [
      {
        id: 'welcome',
        header: false,
        footer: false,
        render: () => <WelcomeSection />,
      },
      {
        id: 'login',
        header: false,
        footer: false,
        render: () => <LoginSection />,
      },
      {
        id: 'about',
        header: true,
        footer: false,
        render: () => <AboutSection />,
      },
      {
        id: 'legal',
        header: true,
        footer: false,
        render: () => <LegalSection />,
      },
      {
        id: 'jams',
        header: true,
        footer: true,
        render: () => <JamsSection />,
      },
    ];
  }
}

export default (new SectionManager());