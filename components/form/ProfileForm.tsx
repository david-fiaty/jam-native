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

  useEffect(() => {
    (async () => {
      let currentUserData: any = await UserManager.getUserData();
      console.log('-----');
      console.log(currentUserData);

      setTimeout(() => {
        setUserData(currentUserData);
        setIsLoaded(true);
      }, Layout.animation.duration);
    })();
  });

  if (!isLoaded) return <SpinnerView />;

  return <></>;

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
            { !userProfile?.profiles[0].profile_picture?.url?.length && 
              <BoxView direction="row" align="center" justify="space-between">
                <IconView name="user" theme="primary" size={60} radius="circle" />
                <TextView>{i18n.t('Change your Jammer user profile image.')}</TextView>
                <IconView name="next" theme="clear" size={60} />
              </BoxView>
            } 

            { userProfile?.profiles[0].profile_picture?.url?.length > 0 && 
              <BoxView direction="row" align="center" justify="space-between" style={styles.profileImageContainer}>
                <ImageView 
                  uri={Config.imageUrl + userProfile?.profiles[0].profile_picture?.url} 
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
        value={userProfile?.email}
        onChangeText={(text: string) => {
          userProfile.email = text;
        }}
      />
      <InputTextField
        placeholder={i18n.t('User name')}
        value={userProfile?.username}
        onChangeText={(text: string) => {
          userProfile.username = text;
        }}
      />
      <InputTextField
        placeholder={i18n.t('Phone number')}
        value={userProfile?.phone}
        onChangeText={(text: string) => {
          userProfile.phone = text;
        }}
      />
      <InputTextareaField
        placeholder={i18n.t('Description')}
        value={userProfile?.profiles[0].profile_description}
        onChangeText={(text: string) => {
          userProfile.profiles[0].profile_description = text;
        }}
      />

      <UserLocationField />

      <IndustryField />

      <CreativeOrganizationField />

      <DividerView />
      <UserProjectsList data={userProjectsData} />

      <DividerView />
      <UserJamsList data={userJamsData} />
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
