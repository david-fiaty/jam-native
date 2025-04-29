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

class SectionManager {
  previousSection(router: any) {
    let activeSections: any = [...Store.getState().section.active];
    let previousSectionIndex: number = 0;

    if (activeSections.length > 1) previousSectionIndex = activeSections.length - 2;
    else if (activeSections.length > 0) previousSectionIndex = activeSections.length - 1;

    if (activeSections.length > 0) {
      activeSections.pop();
      Store.dispatch(setActiveSections(activeSections));
    }
      
    router.dismissTo(`/${activeSections[previousSectionIndex]}`);
  }
}

export default (new SectionManager());