import AboutSection from "@/components/section/AboutSection";
import JamsSection from "@/components/section/JamsSection";
import LegalSection from "@/components/section/LegalSection";
import LoginSection from "@/components/section/LoginSection";
import WelcomeSection from "@/components/section/WelcomeSection";
import i18n from "@/translation/i18n";
import SignupSection from "@/components/section/SignupSection";
import ProfileSection from "@/components/section/ProfileSection";
import AccountForm from "@/components/form/AccountForm";
import PasswordForm from "@/components/form/PasswordForm";

class SectionManager {
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
        showFooter: false,
        render: () => <AboutSection />,
      },
      {
        id: 'legal',
        title: i18n.t('Legal'),
        showFooter: false,
        render: () => <LegalSection />,
      },
      {
        id: 'jams',
        title: i18n.t('Jams'),
        showBackButton: false,
        render: () => <JamsSection />,
      },
      {
        id: 'profile',
        title: i18n.t('Profile'),
        render: () => <ProfileSection />,
      },
      {
        id: 'account',
        title: i18n.t('Account'),
        render: () => <AccountForm />,
      },
      {
        id: 'password',
        title: i18n.t('Password'),
        render: () => <PasswordForm />,
      },
    ].map((o: any) => {
      return {
        ...{
          showTitle: true,
          showHeader: true,
          showFooter: true,
          showBackButton: true,
        },
        ...o,
      };
    });
  }
}

export default (new SectionManager());