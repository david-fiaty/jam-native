import { setSectionId } from "@/redux/slices/SectionSlice";
import Store from "@/redux/Store";
import AboutSection from "@/components/section/AboutSection";
import JamsSection from "@/components/section/JamsSection";
import LegalSection from "@/components/section/LegalSection";
import LoginSection from "@/components/section/LoginSection";
import WelcomeSection from "@/components/section/WelcomeSection";
import i18n from "@/translation/i18n";
import SignupSection from "@/components/section/SignupSection";
import ProfileSection from "@/components/section/ProfileSection";

class SectionManager {
  pushSection(sectionId: string, router: any, params?: any) {
    router.push({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }

  replaceSection(sectionId: string, router: any, params?: any) {
    router.replace({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }

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

  getSection(modalId: any, renderer: boolean = true) {
    return this.getSections(renderer).find((o: any) => o.id === modalId);
  }

  getSections(renderer: boolean = true) {
    let config: any[] = this.getConfig();

    if (!renderer) {
      config = config.map(({ render, ...rest }) => rest);
    }

    return config;
  }

  getConfig() {
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
        id: 'signup',
        title: i18n.t('Signup'),
        showTitle: false,
        showHeader: false,
        showFooter: false,
        showBackButton: false,
        render: () => <SignupSection />,
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
      {
        id: 'profile',
        title: i18n.t('Profile'),
        showTitle: true,
        showHeader: true,
        showFooter: true,
        showBackButton: false,
        render: () => <ProfileSection />,
      },
    ];
  }
}

export default (new SectionManager());