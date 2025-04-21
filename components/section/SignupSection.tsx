import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import SignupCodeForm from "../form/signup-form/SignupCodeForm";
import SignupEmailForm from "../form/signup-form/SignupEmailForm";
import ProfileForm from "../form/ProfileForm";
import BoxView from "../view/BoxView";
import LogoView from "../view/LogoView";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";

const SignupSection = () => {
  const formData = useSelector((state: any) => state.form?.profile);
  
  const isContainerScrollable = () => {
    return formData?.profile_type?.length > 0;
  };

  return (
    <BoxView 
      direction="column" 
      align="center" 
      justify="center" 
      style={[Layout.screenContent, isContainerScrollable() ? styles.scrollableContainer : {}]}
      scroll={isContainerScrollable()}
    >
      <LogoView size={80} />    
      <TextView style={styles.slogan}>{i18n.t('Create your JAM account')}</TextView> 
      
      {formData?.success !== true && <SignupEmailForm />}
      {formData?.success !== true && formData?.session?.length > 0 && <SignupCodeForm />}
      {formData?.success === true && <ProfileForm />}

    </BoxView>
  );
};

const styles = StyleSheet.create({
  slogan: {
    textTransform: 'uppercase',
    fontSize: Layout.fontSize.base,
  },
  scrollableContainer: {
    paddingTop: Layout.space.base*4,
    paddingBottom: Layout.space.base*2,
  },
});

export default SignupSection;