import i18n from "@/translation/i18n";
import AboutSection from "@/components/section/AboutSection";
import JamsSection from "@/components/section/JamsSection";
import LegalSection from "@/components/section/LegalSection";
import LoginSection from "@/components/section/LoginSection";
import WelcomeSection from "@/components/section/WelcomeSection";
import SignupSection from "@/components/section/SignupSection";
import ProfileSection from "@/components/section/ProfileSection";
import PrivacySection from "@/components/section/PrivacySection";
import JamItemSection from "@/components/section/JamItemSection";
import ProfileItemSection from "@/components/section/ProfileItemSection";
import ProjectItemSection from "@/components/section/ProjectItemSection";
import ProfileFormSection from "@/components/section/ProfileFormSection";
import AddProjectForm from "@/components/form/AddProjectForm";
import NotificationItemSection from "@/components/section/NotificationItemSection";
import ResetPasswordForm from "@/components/form/ResetPasswordForm";
import LanguageForm from "@/components/form/LanguageForm";

class Sections {
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
        default: true,
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
        backButtonRoute: '/welcome',
        render: (params: any) => <AboutSection {...params} />,
      },
      {
        id: 'legal',
        title: i18n.t('Legal'),
        showFooter: false,
        backButtonRoute: '/welcome',
        render: (params: any) => <LegalSection {...params} />,
      },
      {
        id: 'privacy',
        title: i18n.t('Privacy'),
        showFooter: false,
        backButtonRoute: '/welcome',
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
        id: 'notification-item',
        title: i18n.t('Notification'),
        showBackButton: true,
        render: (params: any) => <NotificationItemSection {...params} />,
      },
      {
        id: 'profile',
        title: i18n.t('Your profile'),
        render: (params: any) => <ProfileSection {...params} />,
        toolbarButtons: [
          {
            label: i18n.t('Edit'),
            sectionId: 'profile-form',
          },
        ],
      },
      {
        id: 'profile-form',
        title: i18n.t('Edit Profile'),
        render: (params: any) => <ProfileFormSection {...params} />,
      },
      {
        id: 'reset-password',
        title: i18n.t('Reset password'),
        render: (params: any) => <ResetPasswordForm {...params} />,
      },
      {
        id: 'language',
        title: i18n.t('Change language'),
        render: (params: any) => <LanguageForm {...params} />,
      },
      {
        id: 'add-project',
        title: i18n.t('Add project'),
        render: (params: any) => <AddProjectForm {...params} />,
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
          toolbarButtons: [],
        },
        ...o,
      };
    });
  }
}

export default (new Sections());