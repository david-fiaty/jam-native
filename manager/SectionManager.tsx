import AboutSection from "@/components/section/AboutSection";
import JamsSection from "@/components/section/JamsSection";
import LegalSection from "@/components/section/LegalSection";
import LoginSection from "@/components/section/LoginSection";
import WelcomeSection from "@/components/section/WelcomeSection";
import { setSectionId } from "@/redux/slices/SectionSlice";
import Store from "@/redux/Store";

class SectionManager {
  setActiveSection(sectionId: string) {
    Store.dispatch(setSectionId(sectionId));
  }

  getActiveSection(sectionName: string) {
    return Store.getState().section;
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