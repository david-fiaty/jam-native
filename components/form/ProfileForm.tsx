import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import MediaPickerBase from "../base/MediaPickerBase";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import UserLocationField from "../field/UserLocationField";
import IndustryField from "../field/IndustryField";
import DividerView from "../view/DividerView";
import InputTextField from "../field/InputTextField";
import CreativeOrganizationField from "../field/CreativeOrganizationField";
import UserJamsList from "../list/UserJamsList";
import UserProjectsList from "../list/UserProjectsList";
import SpinnerView from "../view/SpinnerView";
import DataManager from "@/classes/DataManager";
import InputTextareaField from "../field/InputTextareaField";
import TextView from "../view/TextView";
import IconView from "../view/IconView";
import ImageView from '../view/ImageView';
import UserManager from "@/classes/UserManager";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState([]);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    (async () => {
      let currentUserData: any = await UserManager.getUserData();
      
      setTimeout(() => {
        setUserData(currentUserData);
        setProfileData(currentUserData?.account?.profiles?.[0]);
        setIsLoaded(true);
      }, Layout.animation.duration);
    })();
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
        onPress={() =>
          dispatch(
            setActiveScreen({
              name: 'ProfileForm',
            })
          )
        }
      />

      <MediaPickerBase
        label={
          <BoxView direction="row" align="center" style={styles.profileImageContainer}>
            { !profileData?.profile_picture?.url?.length && 
              <BoxView direction="row" align="center" justify="space-between">
                <IconView name="user" theme="primary" size={60} radius="circle" />
                <TextView>{i18n.t('Change your Jammer user profile image.')}</TextView>
                <IconView name="next" theme="clear" size={60} />
              </BoxView>
            } 

            { profileData?.profile_picture?.url?.length > 0 && 
              <BoxView direction="row" align="center" justify="space-between" style={styles.profileImageContainer}>
                <ImageView 
                  uri={Config.imageUrl + profileData?.profile_picture?.url} 
                  width={96.7}
                  height={96.7}
                  resizeMode="cover"
                />
                <TextView>{i18n.t('Upload your Jammer user profile image.')}</TextView>
                <IconView name="next" theme="clear" size={60} />
              </BoxView>
            } 

          </BoxView>
        }
      />

      <DividerView />

      <InputTextField
        placeholder={i18n.t('Email address')}
        value={profileData?.email}
        onChangeText={(text: string) => {
          profileData.email = text;
        }}
      />
      
      <InputTextField
        placeholder={i18n.t('Profile name')}
        value={profileData?.profile_name}
        onChangeText={(text: string) => {
          userData.profile_name = text;
        }}
      />
      <InputTextField
        placeholder={i18n.t('Phone number')}
        value={profileData?.phone_number}
        onChangeText={(text: string) => {
          profileData.phone_number = text;
        }}
      />
      <InputTextareaField
        placeholder={i18n.t('Description')}
        value={profileData?.profile_description}
        onChangeText={(text: string) => {
          profileData.profile_description = text;
        }}
      />

      <UserLocationField />
      <IndustryField />
      <CreativeOrganizationField />

      <DividerView />
      <UserProjectsList data={userData?.projects} /> 

      <DividerView />
      <UserJamsList data={userData?.jams} /> 
    </BoxView>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    paddingHorizontal: Layout.space.base,
    width: 200,
  },
});

export default ProfileForm;
