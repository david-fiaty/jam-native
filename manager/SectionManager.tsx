import { setActiveSections } from "@/redux/slices/SectionSlice";
import Store from "@/redux/Store";
import i18n from "@/translation/i18n";
import AboutSection from "@/components/section/AboutSection";
import JamsSection from "@/components/section/JamsSection";
import LegalSection from "@/components/section/LegalSection";
import LoginSection from "@/components/section/LoginSection";
import WelcomeSection from "@/components/section/WelcomeSection";
import SignupSection from "@/components/section/SignupSection";
import ProfileSection from "@/components/section/ProfileSection";
import AccountForm from "@/components/form/AccountForm";
import PasswordForm from "@/components/form/PasswordForm";
import PrivacySection from "@/components/section/PrivacySection";
import JamItemSection from "@/components/section/JamItemSection";
import ProfileItemSection from "@/components/section/ProfileItemSection";
import ProjectItemSection from "@/components/section/ProjectItemSection";

class SectionManager {
  previousSection(router: any) {
    let activeSections: any = [...Store.getState().section.active];
  
    activeSections.pop();
    Store.dispatch(setActiveSections(activeSections));

    if (activeSections.length > 0) {
      let previousSection: any = activeSections[activeSections.length - 1];
      if (previousSection.backButtonRoute !== null) router.dismissTo(`/${previousSection.backButtonRoute}`)
      else router.dismissTo(`/${previousSection.id}`);
    }
    else {
      router.dismissTo('/');
    }
  }

  getSection(sectionId: any, renderer: boolean = true) {
    return this.getSections(renderer).find((o: any) => o.id === sectionId);
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
        showHeader: false,
        showFooter: false,
        showBackButton: false,
        render: (params: any) => <WelcomeSection {...params} />,
      },
      {
        id: 'login',
        title: i18n.t('Login'),
        showTitle: false,
        showHeader: false,
        showFooter: false,
        showBackButton: false,
        render: (params: any) => <LoginSection {...params} />,
      },
      {
        id: 'signup',
        title: i18n.t('Signup'),
        showTitle: false,
        showHeader: false,
        showFooter: false,
        showBackButton: false,
        render: (params: any) => <SignupSection {...params} />,
      },
      {
        id: 'about',
        title: i18n.t('About'),
        showFooter: false,
        backButtonRoute: '/',
        render: (params: any) => <AboutSection {...params} />,
      },
      {
        id: 'legal',
        title: i18n.t('Legal'),
        showFooter: false,
        backButtonRoute: '/',
        render: (params: any) => <LegalSection {...params} />,
      },
      {
        id: 'privacy',
        title: i18n.t('Privacy'),
        showFooter: false,
        backButtonRoute: '/',
        render: (params: any) => <PrivacySection {...params} />,
      },
      {
        id: 'jams',
        title: i18n.t('Jams'),
        showBackButton: false,
        render: (params: any) => <JamsSection {...params} />,
      },
      {
        id: 'jam-item',
        title: i18n.t('Jam'),
        showBackButton: true,
        render: (params: any) => <JamItemSection {...params} />,
      },
      {
        id: 'profile-item',
        title: i18n.t('Profile'),
        showBackButton: true,
        render: (params: any) => <ProfileItemSection {...params} />,
      },
      {
        id: 'project-item',
        title: i18n.t('Project'),
        showBackButton: true,
        render: (params: any) => <ProjectItemSection {...params} />,
      },
      {
        id: 'profile',
        title: i18n.t('Profile'),
        render: (params: any) => <ProfileSection {...params} />,
      },
      {
        id: 'account',
        title: i18n.t('Account'),
        render: (params: any) => <AccountForm {...params} />,
      },
      {
        id: 'password',
        title: i18n.t('Password'),
        render: (params: any) => <PasswordForm {...params} />,
      },
    ].map((o: any) => {
      return {
        ...{
          showTitle: true,
          showHeader: true,
          showFooter: true,
          showBackButton: true,
          backButtonRoute: null,
          params: {},
        },
        ...o,
      };
    });
  }
}

export default (new SectionManager());