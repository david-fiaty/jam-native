import { useState } from "react";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import UserLocationField from "../field/UserLocationField";
import IndustryField from "../field/IndustryField";
import DividerView from "../view/DividerView";
import InputTextField from "../field/InputTextField";
import CountryField from "../field/CountryField";
import UserJamsList from "../list/UserJamsList";
import UserProjectsList from "../list/UserProjectsList";
import SpinnerView from "../view/SpinnerView";
import InputTextareaField from "../field/InputTextareaField";
import UserManager from "@/classes/UserManager";
import ProfileImageField from "../field/ProfileImageField";
import ScreenManager from "@/classes/ScreenManager";

const ProfileForm = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);

  const updateValue = (key: string, value: string) => {
    setProfileData({...profileData, ...{ [key]: value }});
  };

  UserManager.getUserData().then((data: any) => {
    if (!userData) setUserData(Object.assign({}, data));
    if (!profileData) setProfileData(Object.assign({}, data?.account?.profiles?.[0]));

    setIsLoaded(true);
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <BackButton
        title={i18n.t('Your profile')}
        onPress={() => ScreenManager.toggleModal({ name: 'ProfileForm'})}
      />

      <ProfileImageField url={profileData?.profile_picture?.url} />

      <DividerView />

      <InputTextField
        placeholder={i18n.t('Email address')}
        value={profileData?.email}
        onChangeText={(value: string) => updateValue('email', value)}
      />
      
      <InputTextField
        placeholder={i18n.t('Profile name')}
        value={profileData?.profile_name}
        onChangeText={(value: string) => updateValue('profile_name', value)}
      />

      <InputTextField
        placeholder={i18n.t('Phone number')}
        value={profileData?.phone_number}
        onChangeText={(value: string) => updateValue('phone_number', value)}
      />

      <InputTextareaField
        placeholder={i18n.t('Description')}
        value={profileData?.profile_description}
        onChangeText={(value: string) => updateValue('profile_description', value)}
      />

      <UserLocationField 
        latitude={profileData?.geolocation_latitude} 
        longitude={profileData?.geolocation_longitude} 
      />

      <IndustryField selected={profileData?.sectors} />

      <CountryField selected={profileData?.country} />

      <DividerView />
      <UserProjectsList data={userData?.projects} /> 

      <DividerView />
      <UserJamsList data={userData?.jams} /> 

    </BoxView>
  );
};

export default ProfileForm;
