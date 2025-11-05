import React, { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import { useSelector } from "react-redux";
import { Config } from "@/constants/Config";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import ScreenManager from "@/manager/ScreenManager";
import SectionManager from "@/manager/SectionManager";
import ProfileForm from "./ProfileForm";

const resource: string = 'signup';

const SignupForm = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData = useSelector((state: any) => state.form[resource]);
  const signupData: any = useSelector((state: any) => state.form[resource]);

  const submitForm = async () => {    
    let { password, password_confirmation, ...profileData } = formData;

    let payload: any = {
      ...{ profile: profileData },
      ...{
        email: signupData.email,
        session: signupData.session,
        password: password,
      },
    };

    let result: any = await UserManager.register(payload);

    if (result.success === false) {
      ScreenManager.showMessage({
        title: i18n.t('User registration'),
        content: result.message,
      });
    }
    else {
      SectionManager.push(router, Config.mainSection);
    }
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, formData]);

  return (
    <ProfileForm 
      resource={resource} 
      onSubmit={submitForm} 
    />
  );
};

export default SignupForm;
