import { setSectionId } from "@/redux/slices/SectionSlice";
import Store from "@/redux/Store";
import AboutSection from "@/components/section/AboutSection";
import JamsSection from "@/components/section/JamsSection";
import LegalSection from "@/components/section/LegalSection";
import LoginSection from "@/components/section/LoginSection";
import WelcomeSection from "@/components/section/WelcomeSection";
import i18n from "@/translation/i18n";

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
        title: i18n.t('Welcome'),
        showTitle: false,
        showHeader: true,
        showFooter: true,
        showBackButton: false,
        render: () => <WelcomeSection />,
      },
      {
        id: 'login',
        title: i18n.t('Login'),
        showTitle: false,
        showHeader: false,
        showFooter: false,
        showBackButton: false,
        render: () => <LoginSection />,
      },
      {
        id: 'about',
        title: i18n.t('About'),
        showTitle: true,
        showHeader: true,
        showFooter: false,
        showBackButton: true,
        render: () => <AboutSection />,
      },
      {
        id: 'legal',
        title: i18n.t('Legal'),
        showTitle: true,
        showHeader: true,
        showFooter: false,
        showBackButton: true,
        render: () => <LegalSection />,
      },
      {
        id: 'jams',
        title: i18n.t('Jams'),
        showTitle: true,
        showHeader: true,
        showFooter: true,
        showBackButton: false,
        render: () => <JamsSection />,
      },
    ];
  }
}

export default (new SectionManager());