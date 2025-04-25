import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import InputTextField from '../field/InputTextField';
import SpinnerView from '../view/SpinnerView';
import ButtonView from '../view/ButtonView';
import DividerView from '../view/DividerView';
import UserManager from '@/manager/UserManager';
import DataManager from '@/manager/DataManager';
import ScreenManager from '@/manager/ScreenManager';

const AccountForm = () => {
  const resource: string = 'account';
  const dispatch = useDispatch();
  const router = useRouter();
  const [profileId, setProfileId] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const formData = useSelector((state: any) => state.form[resource]);

  const updateField = (key: string, value: any) => {
    dispatch(setFormData<any>({ 
      resource: resource,
      key: key, 
      value: value, 
    }));
  };

  const submitForm = async () => {
    setIsProcessing(true);
    let profileData: any = await UserManager.getProfileData();

    // Todo - Implement submit
    /*
    profileData.username = formData.username;
    profileData.email = formData.email;
    profileData.phone = formData.phone;
    */

    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };  

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        let profileId: number = await UserManager.getProfileId();
        let userData: any = DataManager.extract(['username', 'email', 'phone'], await UserManager.getUserData());

        setProfileId(profileId);
        dispatch(setFormData<any>({ 
          resource: resource,
          key: null, 
          value: userData, 
        }));
        
        setIsLoaded(true);
      } 
    })();
  }, [isLoaded, resource]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Account information')}
        onPress={() => ScreenManager.popScreen(router)}
      />
    
      <InputTextField 
        placeholder={i18n.t('User name')} 
        value={formData?.username}
        onChangeText={(value: string) => updateField("username", value)}
      />
      <InputTextField 
        placeholder={i18n.t('Email address')} 
        value={formData?.email}  
        onChangeText={(value: string) => updateField("email", value)}
      />
      <InputTextField 
        placeholder={i18n.t('Phone number')} 
        value={formData?.phone}
        onChangeText={(value: string) => updateField("phone", value)}
      />

    <DividerView />
    <ButtonView 
      label={i18n.t('Save')} 
      isProcessing={isProcessing} 
      onPress={submitForm} 
    />

    </BoxView>
  );
};

export default AccountForm;